#for chrom in ["chr1",  "chr10", "chr11", "chr12", "chr13", "chr14", "chr15", "chr16", "chr17", "chr18", "chr19", "chr2",  "chr20", "chr21", "chr22", "chr3",  "chr4",  "chr5",  "chr6",  "chr7",  "chr8",  "chr9",  "chrX",  "chrY"]:
import os
import os.path as op

chrom = 'chr1'
localDir = "/home/ubuntu/pkerp"
protpos_genomepos = (sc.textFile(localDir + '/output/protpos_chrompos_pdbinfo_formatted_' + chrom)
                       .map(lambda x: x.split())
                       .map(lambda x: ((x[5] + "_" + x[6]), " ".join([x[2], x[4], str(int(x[4]) + 1), x[7], '.', x[3]]))))
struct_bed = protpos_genomepos.groupByKey()

def save_file((struct_chain, bed_text)):
    output_dir = 'output/struct_chains'
    if not op.exists(output_dir):
        os.makedirs(output_dir)
    filename = 'output/struct_chains/' + struct_chain
    if op.exists(filename):
        print >>sys.stderr, "Already exists:"< filename
    with open(filename, 'w') as f:
        for bed_line in bed_text:
            f.write(bed_line + '\n')

struct_bed.take(1)
struct_bed.foreach(save_file)
