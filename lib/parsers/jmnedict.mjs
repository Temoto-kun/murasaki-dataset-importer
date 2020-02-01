import XmlStream from 'xml-stream'
import getUnzipStream from '../utilities/getUnzipStream.mjs'
import getFetchStream from '../utilities/getFetchStream.mjs'

export default ({
	url,
	unzip = 'gzip',
}) => {
	const unzipStream = getUnzipStream(unzip)
	const fetchStream = getFetchStream(url)
	const inputStream = fetchStream.pipe(unzipStream)

	const xmlStream = new XmlStream(inputStream)

	xmlStream.collect('kanjidic2 > character > codepoint > cp_value')
	xmlStream.collect('kanjidic2 > character > misc > stroke_count')
	xmlStream.collect('kanjidic2 > character > misc > variant')
	xmlStream.collect('kanjidic2 > character > misc > rad_name')
	xmlStream.collect('kanjidic2 > character > radical > rad_value')
	xmlStream.collect('kanjidic2 > character > dic_nunber > dic_ref')
	xmlStream.collect('kanjidic2 > character > query_code > q_code')
	xmlStream.collect('kanjidic2 > character > reading_meaning > rmgroup')
	xmlStream.collect('kanjidic2 > character > reading_meaning > rmgroup > reading')
	xmlStream.collect('kanjidic2 > character > reading_meaning > rmgroup > meaning')
	xmlStream.collect('kanjidic2 > character > reading_meaning > nanori')

	xmlStream.on('endElement: header', data => {
		inputStream.emit('metadata', data)
	})

	xmlStream.on('endElement: character', data => {
		inputStream.emit('entry', data)
	})

	return inputStream
}
