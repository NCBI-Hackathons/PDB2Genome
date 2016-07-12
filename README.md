# PDB2Genome
Mapping PDB structures to gene-level in genome browsers, and visualizing SNPs

# Background
Genome browsers like [NCBI Genome Data Viewer](https://www.ncbi.nlm.nih.gov/genome/gdv/help/) enables users to view tracks of genomic data, e.g. for gene C1QA: 

https://www.ncbi.nlm.nih.gov/genome/gdv/?context=genome&acc=GCF_000001405.33&q=C1QA

Adding aligned PDB data as tracks in such a visualization would help reveal relationships between protein structures and SNPs, including small variants of clinical interest.

# Use cases

One potentially popular use case is co-display of these tracks with protein domains from the Conserved Domain Database (CDD).  This can be done on full-featured NCBI Genome Viewers (Genome Data Viewer, Variation Viewer, 1000 Genomes Viewer, etc.)

This can be implemented by:

* opening the tracks menu in any fully featured sequence viewer [screenshot](https://github.com/NCBI-Hackathons/PDB2Genome/blob/master/Screen%20Shot%202016-07-09%20at%2011.03.37%20PM.png)
* in the genes, select the current annotation and choose 'select all from the dropdown' [screenshot](https://github.com/NCBI-Hackathons/PDB2Genome/blob/master/Screen%20Shot%202016-07-10%20at%2012.11.33%20AM.png)
* below that, check the show all labels box [screenshot](https://github.com/NCBI-Hackathons/PDB2Genome/blob/master/Screen%20Shot%202016-07-10%20at%2012.22.14%20AM.png)
* click configure

# Results

##Results 1

## Experimental support for remote tracks 
In addition to aligning PDB files to the genome, this hackathon also resulted in a [proof of concept for loading track data in NCBI genome browsers from any third-party web server](https://github.com/NCBI-Hackathons/PDB2Genome/blob/master/src/js/remote-tracks-experiment.js).  This enables users to load track data without the need for an intermediate backend server, i.e. without the need for "hubs".  Such functionality could be useful for those seeking to programmatically display small sets of track data as static flat files.  Underlying data is hosted on GitHub Pages (e.g. https://ncbi-hackathons.github.io/PDB2Genome/bedjs/2WNU_A.bed.js), which provides static, CORS-enabled, secure web hosting for free.

## Results 3

# Future work
The PDB accessions displayed on the genome will be linked to structures displayed by [iCn3D](http://www.ncbi.nlm.nih.gov/Structure/icn3d/icn3d.html) after streaming from the PDB in compressed format using [MMTF](http://mmtf.rcsb.org/).  

# Data

Files loaded to the NCBI Genome Data Viewer can be recapitulated for other genome browsers by running the scripts in this repo against the parquet files found at [dataframes.rcsb.org](https://github.com/rcsb/dataframes).
