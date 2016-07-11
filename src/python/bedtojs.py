import json

pdb_id = "2WNU_A"
beds = {}
#lines = open("bed/3/" + pdb_id + ".bed").read().split("\n") # Not same as readlines()!
lines2 = open("bed/3/" + pdb_id + ".bed").read().replace(" ", "\t")
beds[pdb_id] = lines2

#js = "beds['" + pdb_id + "'] = " + json.dumps(lines) + ";"
js = "beds['" + pdb_id + "'] = " + json.dumps(lines2) + ";"
open(pdb_id + ".bed.js", "w").write(js)
