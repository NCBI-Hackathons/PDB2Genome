# PDB2Genome
Mapping PDB structures to gene-level in genome browsers, and visualizing SNPs

Example [NCBI Genome Data Viewer](https://www.ncbi.nlm.nih.gov/genome/gdv/help/) gene-level view:

* Via genomic coordinates: https://www.ncbi.nlm.nih.gov/genome/gdv/?context=genome&acc=GCF_000001405.33&chr=11&from=65653596&to=65662972

* Via gene symbol: https://www.ncbi.nlm.nih.gov/genome/gdv/?context=genome&acc=GCF_000001405.33&q=RELA

One potentially popular use case is co-display of these tracks with protein domains from the Conserved Domain Database (CDD).  This can be done on full-featured NCBI Genome Viewers (Genome Data Viewer, Variation Viewer, 1000 Genomes Viewer, etc.)

This can be implemented by:

* opening the tracks menu in any fully featured sequence viewer (screenshot)[https://github.com/NCBI-Hackathons/PDB2Genome/blob/master/Screen%20Shot%202016-07-09%20at%2011.03.37%20PM.png]
* in the genes, select the current annotation and choose 'select all from the dropdown' (screenshot)[https://github.com/NCBI-Hackathons/PDB2Genome/blob/master/Screen%20Shot%202016-07-10%20at%2012.11.33%20AM.png]
* below that, check the show all labels box (screenshot)[https://github.com/NCBI-Hackathons/PDB2Genome/blob/master/Screen%20Shot%202016-07-10%20at%2012.22.14%20AM.png]
* click configure
