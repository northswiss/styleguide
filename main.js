const getTitles = () => {
  const titles = document.querySelectorAll('h2, h3')
  return Array.from(titles)
}

const setupTOC = () => {
}

addExternalLinks = () => {
  const externalLinks = Array.from(document.querySelectorAll('a[href^=http]'))
  externalLinks.forEach(link => {
    link.target = '_blank'
    link.rel="noopener noreferrer"
  })
}

setupTOC()
addExternalLinks()
