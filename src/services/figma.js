const BASE_URL = 'https://api.figma.com/v1'

export function setApiKey(key) {
  if (key) localStorage.setItem('figma_api_key', key)
}

export function getApiKey() {
  return localStorage.getItem('figma_api_key') || ''
}

async function figmaRequest(endpoint) {
  const key = getApiKey()
  if (!key) throw new Error('No Figma API key set. Enter your key in the dashboard.')

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'X-Figma-Token': key },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }))
    throw new Error(error.message || `Figma API error: ${response.status}`)
  }

  return response.json()
}

export function getMe() { return figmaRequest('/me') }
export function getTeamProjects(teamId) { return figmaRequest(`/teams/${teamId}/projects`) }
export function getProjectFiles(projectId) { return figmaRequest(`/projects/${projectId}/files`) }
export function getFile(fileKey) { return figmaRequest(`/files/${fileKey}`) }
export function getFileNodes(fileKey, nodeIds) { return figmaRequest(`/files/${fileKey}/nodes?ids=${nodeIds.join(',')}`) }
export function getImages(fileKey, nodeIds, format = 'svg', scale = 1) { return figmaRequest(`/images/${fileKey}?ids=${nodeIds.join(',')}&format=${format}&scale=${scale}`) }
export function getFileComponents(fileKey) { return figmaRequest(`/files/${fileKey}/components`) }
export function getFileStyles(fileKey) { return figmaRequest(`/files/${fileKey}/styles`) }
export function getComponent(key) { return figmaRequest(`/components/${key}`) }
export function getStyle(key) { return figmaRequest(`/styles/${key}`) }
