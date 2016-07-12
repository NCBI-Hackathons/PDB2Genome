# Serializes BED file into JS, to enable CORS and remote genome browser tracks

import json

stem = "chr2"

beds = {}
lines2 = open(stem + ".bed").read().replace(" ", "\t")
beds[stem] = lines2

js = "beds['" + stem + "'] = " + json.dumps(lines2) + ";"
open(stem + ".bed.js", "w").write(js)
