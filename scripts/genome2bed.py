#for chrom in ["chr1",  "chr10", "chr11", "chr12", "chr13", "chr14", "chr15", "chr16", "chr17", "chr18", "chr19", "chr2",  "chr20", "chr21", "chr22", "chr3",  "chr4",  "chr5",  "chr6",  "chr7",  "chr8",  "chr9",  "chrX",  "chrY"]:
import os
import sys
import os.path as op

localDir = "/home/ubuntu/pkerp"
output_dir = 'output/struct_chroms'

def save_entries(chromosome, out_bed):
    if not op.exists(output_dir):
        os.makedirs(output_dir)
    filename = output_dir + '/' + chromosome + ".bed"
    if op.exists(filename):
        os.remove(filename)
    def save_line(x):
        with open(filename, 'a') as f:
            f.write(x[1] + "\n")
    out_bed.foreach(save_line)


def reduce_struct_chain_res(x1, x2):
    # Used to calculate the minimum genomic position that corresponds to a nucleotide
    # so that we can get the start and end points for the codon for an amino acid
    return (min(x1[0], x2[0]), max(x1[1], x2[1]), x1[2])

chrom = 'chr2'
#for chrom in ["chr1",  "chr10", "chr11", "chr12", "chr13", "chr14", "chr15", "chr16", "chr17", "chr18", "chr19", "chr2",  "chr20", "chr21", "chr22", "chr3",  "chr4",  "chr5",  "chr6",  "chr7",  "chr8",  "chr9",  "chrX",  "chrY"]:
protpos_genomepos = (sc.textFile(localDir + '/output/protpos_chrompos_pdbinfo_formatted_' + chrom)
                       .map(lambda x: x.split())
                       .filter(lambda x: x[2] == chrom)    #exclude alternate chromosomes
                       .map(lambda x: ((x[5] + "_" + x[6]), (int(x[4]), int(x[4]), (x[2], x[7], '.', x[3], x[5])))))
struct_bed = protpos_genomepos.reduceByKey(reduce_struct_chain_res)
struct_bed.take(1)

out_bed = (struct_bed.map(lambda x: (x[0], " ".join(map(str, [chrom, x[1][0], x[1][1]+1, x[0], '.', x[1][2][3]])))))
out_bed.take(1)

save_entries(chrom, out_bed)

#out_bed.foreach(save_file)
