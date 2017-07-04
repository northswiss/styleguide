const getTitles = () => {
  const titles = document.querySelectorAll('h2, h3, h4')
  return Array.from(titles)
}

const setupTOC = () => {
  const toc = document.getElementById('toc')
  const titles = getTitles()

  let h2 = 0
  let h3 = 0
  let h4 = 0
  titles.map(title => {
    let text
    switch(title.tagName) {
      case 'H2':
        h3 = 0
        h4 = 0
        text = `${++h2} ${title.textContent}`
        break
      case 'H3':
        h4 = 0
        text = `${h2}.${++h3} ${title.textContent}`
        break
      case 'H4':
        text = `${h2}.${h3}.${++h4} ${title.textContent}`
        break
    }
    const url = encodeURIComponent(title.textContent)

    title.id = url

    return { text, url }
  }).map(({ text, url }) => {
    const titleElement = document.createElement('a')
    titleElement.href = `#${url}`
    titleElement.text = text
    toc.appendChild(titleElement)
  })
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
