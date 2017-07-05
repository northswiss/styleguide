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
    let level
    switch(title.tagName) {
      case 'H2':
        h3 = 0
        h4 = 0
        text = `${++h2} ${title.textContent}`
        level = 2
        break
      case 'H3':
        h4 = 0
        text = `${h2}.${++h3} ${title.textContent}`
        level = 3
        break
      case 'H4':
        text = `${h2}.${h3}.${++h4} ${title.textContent}`
        level = 4
        break
    }
    const url = encodeURIComponent(title.textContent)

    title.id = url

    return { text, url, level }
  }).map(({ text, url, level }) => {
    const titleElement = document.createElement('a')
    titleElement.href = `#${url}`
    titleElement.text = text
    titleElement.classList.add(`level_${level}`)
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
