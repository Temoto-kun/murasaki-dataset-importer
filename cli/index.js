import fs from 'fs'
import download from '../lib/index.mjs'

const sources = [
	{
		url: 'http://ftp.monash.edu/pub/nihongo/JMnedict.xml.gz',
		type: 'jmnedict',
	},
	{
		url: 'http://ftp.monash.edu/pub/nihongo/JMdict.gz',
		type: 'jmdict',
	},
	{
		url: 'http://www.edrdg.org/kanjidic/kanjidic2.xml.gz',
		type: 'kanjidic2',
	}
]

const main = async () => {
	const buffer = {
		entry: [],
	}

	const inputStream = await download({
		url: 'http://www.edrdg.org/kanjidic/kanjidic2.xml.gz',
		type: 'kanjidic2',
		gunzip: true,
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

main()
