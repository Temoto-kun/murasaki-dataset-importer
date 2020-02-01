import kanjidic2 from './parsers/kanjidic2.mjs'
import jmdict from './parsers/jmdict.mjs'
import jmnedict from './parsers/jmnedict.mjs'
import fs from "fs"

const PARSERS = {
	kanjidic2,
	jmdict,
	jmnedict,
}

export default ({
	url,
	type,
	output,
	format,
	...options
}) => {
	const { [type]: parser = null, } = PARSERS
	let inputStream

	if (parser !== null) {
		inputStream = parser({
			url,
			...options
		})

		inputStream.on('entry', data => {
			buffer.entry.push(data)
		})

		inputStream.on('metadata', data => {
			buffer.metadata = data
		})

		inputStream.on('end', () => {
			fs.writeFile('./out/kanjidic.json', JSON.stringify(buffer), err => {
				if (err) {
					console.log(err.code)
				}
			})
		})
	}

	return null
}
