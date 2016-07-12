### Convert the uniprot, genome, pdb files to a per uniprot id listing:
# cat pdbs_for_uniprot/P17542.txt  
#     2YPA_A
#     2YPB_A
import os
import sys
import os.path as op

localDir = "/home/ubuntu/pkerp"
output_dir = 'output/uniprot_pdbs'

def combine_sets(s1, s2):
    return s1.union(s2)

def save_file((struct_chain, pdb_ids)):
    # store a BED file for each PDB ID
    if not op.exists(output_dir):
        os.makedirs(output_dir)
    filename = output_dir + '/' + struct_chain + ".txt"
    if op.exists(filename):
        print >>sys.stderr, "Already exists:", filename
    with open(filename, 'a') as f:
        f.write("\n".join(list(pdb_ids)) "\n")

chrom = 'chr2'
for chrom in ["chr1",  "chr10", "chr11", "chr12", "chr13", "chr14", "chr15", "chr16", "chr17", "chr18", "chr19", "chr2",  "chr20", "chr21", "chr22", "chr3",  "chr4",  "chr5",  "chr6",  "chr7",  "chr8",  "chr9",  "chrX",  "chrY"]:
    protpos_genomepos = (sc.textFile(localDir + '/output/protpos_chrompos_pdbinfo_formatted_' + chrom)
                           .map(lambda x: x.split())
                           .map(lambda x: (x[0], set([x[5] + "_" + x[6]]))))
    prot_pdb = protpos_genomepos.reduceByKey(combine_sets)
    prot_pdb.foreach(save_file)

