import request from 'request'
import fs from 'fs'

const isRemoteUrl = url => (
	url.startsWith('http://')
	|| url.startsWith('https://')
)

export default url => {
	if (isRemoteUrl(url)) {
		return request(url)
	}
	return fs.createReadStream(url)
}
