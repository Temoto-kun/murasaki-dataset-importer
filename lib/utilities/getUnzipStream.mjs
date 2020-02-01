import zlib from 'zlib'
import stream from 'stream'

export default unzipType => {
	switch (unzipType) {
		case 'gzip':
			return zlib.createGunzip()
		default:
			break
	}
	return new stream.PassThrough()
}
