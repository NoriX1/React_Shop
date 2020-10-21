import React from "react"
import ContentLoader from "react-content-loader"

const ProductLoader = (props) => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={458}
    viewBox="0 0 280 458"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="136" cy="128" r="123" />
    <rect x="2" y="265" rx="6" ry="6" width="280" height="30" />
    <rect x="0" y="310" rx="6" ry="6" width="280" height="85" />
    <rect x="160" y="410" rx="6" ry="6" width="120" height="40" />
    <rect x="3" y="410" rx="6" ry="6" width="120" height="40" />
  </ContentLoader>
)

export default ProductLoader;