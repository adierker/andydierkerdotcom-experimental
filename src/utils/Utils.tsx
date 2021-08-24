export const onClickOpenLink = (url: string, newTab: boolean = true) => {
  const newTabArgs = newTab ? ['_blank', 'noopener, noreferrer'] : ['_self']
  const newWindow = window.open(url, ...newTabArgs)
  if (newWindow) newWindow.opener = null
}