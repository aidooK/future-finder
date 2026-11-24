export type DetailImage = {
  src: string
  alt: string
  width: number
  height: number
  kind: 'photo' | 'poster' | 'logo'
  caption?: string
  credit?: string
  illustrative?: boolean
}

export default function OpportunityImage({ image }: { image: DetailImage | null }) {
  if (!image) return null
  const poster = image.kind === 'poster'
  const caption = [image.illustrative ? 'Illustrative image.' : '', image.caption || ''].filter(Boolean).join(' ')
  const showCaption = Boolean(caption || image.credit || poster)

  return (
    <figure className={image.kind === 'logo' ? 'detail-image is-logo' : 'detail-image'}>
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
      />
      {showCaption ? (
        <figcaption>
          {caption ? <span>{caption}</span> : null}
          {image.credit ? <span className="detail-image-credit">{image.credit}</span> : null}
          {poster ? <a href={image.src}>View full poster</a> : null}
        </figcaption>
      ) : null}
    </figure>
  )
}
