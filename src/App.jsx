import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [brideImage, setBrideImage] = useState(null)
  const [groomImage, setGroomImage] = useState(null)
  const [nhanuIcon, setNhanuIcon] = useState(null)
  const [nhanamIcon, setNhanamIcon] = useState(null)
  const [baohyIcon, setBaohyIcon] = useState(null)

  // Kiểm tra và load hình ảnh từ folder images
  useEffect(() => {
    const checkImage = async (paths, setter) => {
      for (const path of paths) {
        try {
          const img = new Image()
          await new Promise((resolve, reject) => {
            img.onload = () => resolve(path)
            img.onerror = () => reject()
            img.src = path
          })
          setter(path)
          return
        } catch {
          continue
        }
      }
      setter(null)
    }

    // Thử load các hình ảnh (hỗ trợ cả .jpg và .png)
    checkImage(['/images/background.jpg', '/images/background.png'], setBackgroundImage)
    checkImage(['/images/bride.jpg', '/images/bride.png'], setBrideImage)
    checkImage(['/images/groom.jpg', '/images/groom.png'], setGroomImage)
    
    // Load các icon cho các link
    checkImage(['/images/nhanu-icon.jpg', '/images/nhanu-icon.png'], setNhanuIcon)
    checkImage(['/images/nhanam-icon.jpg', '/images/nhanam-icon.png'], setNhanamIcon)
    checkImage(['/images/baohy-icon.jpg', '/images/baohy-icon.png'], setBaohyIcon)
  }, [])

  const links = [
    {
      id: 1,
      title: 'Thiệp nhà nữ',
      href: 'https://vesey.vn/cards/huyenhienwedding-nhanu/',
      emoji: '👰',
      icon: nhanuIcon,
      color: '#FFB6C1'
    },
    {
      id: 2,
      title: 'Thiệp nhà nam',
      href: 'https://vesey.vn/cards/huyenhienwedding-nhanam',
      emoji: '🤵',
      icon: nhanamIcon,
      color: '#87CEEB'
    },
    {
      id: 3,
      title: 'Thiệp báo hỷ',
      href: 'https://vesey.vn/cards/huyenhienwedding-baohy',
      emoji: '💒',
      icon: baohyIcon,
      color: '#FFD700'
    }
  ]

  return (
    <div 
      className={`app ${backgroundImage ? 'has-background' : ''}`}
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : {}}
    >
      <div className="container">
        <div className="header">
          <div className="couple-images">
            <div className="bride-image">
              {brideImage ? (
                <img 
                  src={brideImage} 
                  alt="Cô dâu" 
                  className="couple-photo"
                />
              ) : (
                <div className="image-placeholder bride">
                  <span className="emoji">👰</span>
                </div>
              )}
            </div>
            <div className="hearts">💕</div>
            <div className="groom-image">
              {groomImage ? (
                <img 
                  src={groomImage} 
                  alt="Chú rể" 
                  className="couple-photo"
                />
              ) : (
                <div className="image-placeholder groom">
                  <span className="emoji">🤵</span>
                </div>
              )}
            </div>
          </div>
          <h1 className="title">Thiệp Cưới</h1>
          <p className="subtitle">Chọn thiệp bạn muốn xem</p>
        </div>

        <div className="links-container">
          {links.map((link, index) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
              style={{ '--delay': `${index * 0.1}s`, '--card-color': link.color }}
            >
              <div className="link-icon">
                {link.icon ? (
                  <img 
                    src={link.icon} 
                    alt={link.title}
                    className="link-icon-image"
                  />
                ) : (
                  <span className="link-emoji">{link.emoji}</span>
                )}
              </div>
              <div className="link-title">{link.title}</div>
              <div className="link-arrow">→</div>
            </a>
          ))}
        </div>

        <div className="decorations">
          <div className="flower flower-1">🌸</div>
          <div className="flower flower-2">🌺</div>
          <div className="flower flower-3">🌻</div>
          <div className="flower flower-4">🌷</div>
        </div>
      </div>
    </div>
  )
}

export default App

