for chrom in ["chr1",  "chr10", "chr11", "chr12", "chr13", "chr14", "chr15", "chr16", "chr17", "chr18", "chr19", "chr2",  "chr20", "chr21", "chr22", "chr3",  "chr4",  "chr5",  "chr6",  "chr7",  "chr8",  "chr9",  "chrX",  "chrY"]:
	localDir = "/home/ubuntu/pkerp"
	dataframe = "/data/dataframes.rcsb.org/parquet/humangenome/20160517/hg38/" + chrom
	uniprotpdbFile = '/data/dataframes.rcsb.org/parquet/uniprotpdb/20160517/'
	chrMappingsFile = "/data/GCF_000001405.33.assembly.txt"
	chrMappings = dict(sc.textFile(localDir + chrMappingsFile)
					 .filter(lambda x: x[0] != '#')
					 .map(lambda x: x.split('\t'))
					 .map(lambda x: dict(zip("Sequence-Name Sequence-Role   Assigned-Molecule       Assigned-Molecule-Location/Type GenBank-Accn    Relationship    RefSeq-Accn     Assembly-Unit   Sequence-Length UCSC-style-name".split(), x)))
					 .map(lambda x: (x['UCSC-style-name'],x['GenBank-Accn']))
					 .collect())
	humangenome = (sqlContext.read.parquet(localDir + dataframe))
	#humangenome = humangenome.repartition(32)
	humangenome.registerTempTable("humangenome")
	#humangenome = sqlContext.sql("select * from humangenome limit 100000")
	humangenome.count() #115,989,151
	protpos_chrompos = humangenome.map(lambda x: ((x.uniProtId, int(x.uniProtPos)), (x.chromosomeName, x.orientation, x.position)))
	#protpos_chrompos..take(10)
	#humangenome_dict = dict(humangenome.map(lambda x: ((x.uniProtId, x.uniProtPos), (x.chromosomeName, x.orientation, x.position))).collect())
	uniprotpdb = (sqlContext.read.parquet(localDir + uniprotpdbFile))
	#uniprotpdb = uniprotpdb.repartition(32)
	uniprotpdb.registerTempTable("uniprotpdb")
	#uniprotpdb = sqlContext.sql('select * from uniprotpdb limit 10000')
	uniprotpdb.count() #74,209,158
	protpos_pdbinfo = uniprotpdb.map(lambda x: ((x.uniProtId, int(x.uniProtPos)), (x.pdbId, x.chainId, x.pdbAtomPos, x.insCode)))
	#protpos_pdbinfo.take(10)
	#uniprotMap = dict(uniprotpdb.map(lambda x: ((x.uniProtId, x.uniProtPos), )).collect())
	#map2pdb = sqlContext.sql("select * from humangenome left join uniprotpdb where humangenome.uniProtId = uniprotpdb.uniProtId and humangenome.uniProtPos = uniprotpdb.uniProtPos ")
	joined = protpos_chrompos.join(protpos_pdbinfo)
	joined_formatted = joined.map(lambda ((protid, protpos), ((chrid, orientation, pos), (pdbid, chainid, pdbAtomPos, insCode))): " ".join(map(str,[protid, protpos, chrid, orientation, pos, pdbid, chainid, pdbAtomPos, insCode])))
	joined_formatted.saveAsTextFile("protpos_chrompos_pdbinfo_formatted_" + chrom)
	#joined.saveAsTextFile("protpos_chrompos_p)

