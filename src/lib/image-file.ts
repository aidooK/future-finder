import fs from 'fs'
import path from 'path'

export type ImageSize = { width: number; height: number }

export function readImageSize(bytes: Uint8Array): ImageSize | null {
  return jpegSize(bytes) || pngSize(bytes) || webpSize(bytes)
}

export function readPublicImageSize(src: string): ImageSize | null {
  if (!src.startsWith('/') || src.startsWith('//') || src.includes('\\') || src.includes('..')) return null
  const root = path.resolve(process.cwd(), 'public')
  const file = path.resolve(root, src.slice(1))
  const relative = path.relative(root, file)
  if (relative.startsWith('..') || path.isAbsolute(relative)) return null
  if (!fs.existsSync(file)) return null
  const stat = fs.statSync(file)
  if (!stat.isFile() || stat.size > 20_000_000) return null
  return readImageSize(fs.readFileSync(file))
}

function jpegSize(bytes: Uint8Array): ImageSize | null {
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) return null
  let offset = 2
  while (offset + 8 < bytes.length) {
    if (bytes[offset] !== 0xff) return null
    const marker = bytes[offset + 1]
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
      offset += 2
      continue
    }
    const length = (bytes[offset + 2] << 8) + bytes[offset + 3]
    if (length < 2 || offset + 2 + length > bytes.length) return null
    const startOfFrame = (marker >= 0xc0 && marker <= 0xc3) || (marker >= 0xc5 && marker <= 0xc7) || (marker >= 0xc9 && marker <= 0xcb) || (marker >= 0xcd && marker <= 0xcf)
    if (startOfFrame) {
      const height = (bytes[offset + 5] << 8) + bytes[offset + 6]
      const width = (bytes[offset + 7] << 8) + bytes[offset + 8]
      return positive(width, height)
    }
    offset += 2 + length
  }
  return null
}

function pngSize(bytes: Uint8Array): ImageSize | null {
  if (bytes.length < 24 || bytes[0] !== 0x89 || bytes[1] !== 0x50 || bytes[2] !== 0x4e || bytes[3] !== 0x47) return null
  const width = readUint32(bytes, 16)
  const height = readUint32(bytes, 20)
  return positive(width, height)
}

function webpSize(bytes: Uint8Array): ImageSize | null {
  if (bytes.length < 30 || bytes[0] !== 0x52 || bytes[1] !== 0x49 || bytes[8] !== 0x57 || bytes[9] !== 0x45) return null
  const format = String.fromCharCode(bytes[12], bytes[13], bytes[14], bytes[15])
  if (format === 'VP8X' && bytes.length >= 30) {
    return positive(1 + bytes[24] + (bytes[25] << 8) + (bytes[26] << 16), 1 + bytes[27] + (bytes[28] << 8) + (bytes[29] << 16))
  }
  if (format === 'VP8 ' && bytes.length >= 30) {
    return positive(bytes[26] + (bytes[27] << 8), bytes[28] + (bytes[29] << 8))
  }
  if (format === 'VP8L' && bytes.length >= 25) {
    const bits = bytes[21] + (bytes[22] << 8) + (bytes[23] << 16) + (bytes[24] * 0x1000000)
    return positive((bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1)
  }
  return null
}

function readUint32(bytes: Uint8Array, offset: number): number {
  return ((bytes[offset] * 0x1000000) + (bytes[offset + 1] << 16) + (bytes[offset + 2] << 8) + bytes[offset + 3]) >>> 0
}

function positive(width: number, height: number): ImageSize | null {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width > 20000 || height > 20000) return null
  return { width, height }
}
