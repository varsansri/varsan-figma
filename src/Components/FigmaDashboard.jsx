import { useState, useEffect, useCallback } from 'react'
import { getMe, getFile, getProjectFiles, getTeamProjects, getImages, setApiKey, getApiKey } from '../services/figma'

function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-xl p-5 ${className}`}>
      {title && <h3 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wide">{title}</h3>}
      {children}
    </div>
  )
}

function UserInfo() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Card title="User Info"><div className="animate-pulse h-4 bg-zinc-800 rounded w-3/4" /></Card>
  if (error) return <Card title="User Info"><p className="text-red-400 text-sm">Failed: {error.message}</p></Card>

  return (
    <Card title="Connected As">
      <div className="flex items-center gap-3">
        {user?.img_url && (
          <img src={user.img_url} alt="" className="w-10 h-10 rounded-full" />
        )}
        <div>
          <p className="font-semibold">{user?.handle || user?.email}</p>
          <p className="text-sm text-zinc-500">{user?.id}</p>
        </div>
      </div>
    </Card>
  )
}

function FileExplorer() {
  const [fileKey, setFileKey] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showNodes, setShowNodes] = useState(false)

  const fetchFile = useCallback(async (key) => {
    if (!key.trim()) return
    setLoading(true)
    setError(null)
    try {
      const data = await getFile(key.trim())
      setFile(data)
      setShowNodes(true)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchFile(fileKey)
  }

  return (
    <Card title="File Explorer">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={fileKey}
          onChange={(e) => setFileKey(e.target.value)}
          placeholder="Enter Figma file key..."
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Loading...' : 'Open'}
        </button>
      </form>

      {error && <p className="text-red-400 text-sm mb-3">Error: {error.message}</p>}

      {file && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-lg truncate">{file.name}</p>
            <button
              onClick={() => setShowNodes(!showNodes)}
              className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {showNodes ? 'Hide' : 'Show'} Pages
            </button>
          </div>
          {showNodes && file.document?.children && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {file.document.children.map((page) => (
                <details key={page.id} className="bg-zinc-800 rounded-lg p-3">
                  <summary className="text-sm font-medium cursor-pointer text-zinc-300 hover:text-white">
                    {page.name}
                  </summary>
                  <div className="mt-2 pl-3 border-l border-zinc-700 space-y-1">
                    {page.children?.map((node) => (
                      <p key={node.id} className="text-xs text-zinc-500">
                        {node.name} <span className="text-zinc-600">({node.type})</span>
                      </p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

function ProjectList() {
  const [teamId, setTeamId] = useState('')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [files, setFiles] = useState([])

  const fetchProjects = useCallback(async () => {
    if (!teamId.trim()) return
    setLoading(true)
    setError(null)
    try {
      const data = await getTeamProjects(teamId.trim())
      setProjects(data.projects || [])
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [teamId])

  const fetchProjectFiles = useCallback(async (projectId) => {
    setLoading(true)
    try {
      const data = await getProjectFiles(projectId)
      setFiles(data.files || [])
      setSelectedProject(projectId)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <Card title="Projects">
      <form onSubmit={(e) => { e.preventDefault(); fetchProjects(); }} className="flex gap-2 mb-4">
        <input
          type="text"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          placeholder="Team ID..."
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50 cursor-pointer"
        >
          Fetch
        </button>
      </form>

      {error && <p className="text-red-400 text-sm mb-3">Error: {error.message}</p>}

      {projects.length > 0 && (
        <div className="space-y-2">
          {projects.map((project) => (
            <div key={project.id}>
              <button
                onClick={() => fetchProjectFiles(project.id)}
                className={`w-full text-left bg-zinc-800 rounded-lg p-3 hover:bg-zinc-700 transition-colors cursor-pointer ${selectedProject === project.id ? 'ring-1 ring-white/20' : ''}`}
              >
                <p className="text-sm font-medium">{project.name}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{project.id}</p>
              </button>
              {selectedProject === project.id && files.length > 0 && (
                <div className="ml-3 mt-1 space-y-1 border-l border-zinc-700 pl-3">
                  {files.map((f) => (
                    <p key={f.key} className="text-xs text-zinc-400 truncate">
                      {f.name} <span className="text-zinc-600">({f.key})</span>
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

function ImageExport() {
  const [fileKey, setFileKey] = useState('')
  const [nodeId, setNodeId] = useState('')
  const [images, setImages] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchImages = useCallback(async () => {
    if (!fileKey.trim() || !nodeId.trim()) return
    setLoading(true)
    setError(null)
    try {
      const data = await getImages(fileKey.trim(), [nodeId.trim()])
      setImages(data.images)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [fileKey, nodeId])

  return (
    <Card title="Image Export">
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={fileKey}
          onChange={(e) => setFileKey(e.target.value)}
          placeholder="File key..."
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
        />
        <input
          type="text"
          value={nodeId}
          onChange={(e) => setNodeId(e.target.value)}
          placeholder="Node ID..."
          className="w-1/3 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
        />
        <button
          onClick={fetchImages}
          disabled={loading}
          className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50 cursor-pointer"
        >
          Export
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mb-3">Error: {error.message}</p>}

      {images && Object.entries(images).map(([id, url]) => (
        <div key={id} className="mt-3">
          <p className="text-xs text-zinc-500 mb-1">{id}</p>
          <img src={url} alt={id} className="max-w-full rounded-lg border border-zinc-800" />
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-blue-400 hover:underline mt-1 inline-block"
          >
            Open in new tab
          </a>
        </div>
      ))}
    </Card>
  )
}

export default function FigmaDashboard({ activeTab }) {
  const [keyInput, setKeyInput] = useState(getApiKey())

  const handleSaveKey = () => {
    setApiKey(keyInput)
  }

  return (
    <div className="space-y-6">
      <Card title="Figma API Key">
        <div className="flex gap-2">
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Enter your Figma personal access token..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
          />
          <button
            onClick={handleSaveKey}
            className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
        <p className="text-xs text-zinc-600 mt-2">
          Your key is stored locally in your browser and never sent anywhere except Figma's API.
        </p>
      </Card>
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UserInfo />
          <FileExplorer />
        </div>
      )}
      {activeTab === 'files' && (
        <FileExplorer />
      )}
      {activeTab === 'projects' && (
        <ProjectList />
      )}
      <ImageExport />
    </div>
  )
}
