// Experimental support for embedding iCn3D in Genome Data Viewer

$ = jQuery;
$("head").append(
  '<link rel="stylesheet" href="https://www.ncbi.nlm.nih.gov/Structure/icn3d/lib/jquery-ui.min.css">' + 
  '<link rel="stylesheet" href="https://www.ncbi.nlm.nih.gov/Structure/icn3d/icn3d_full_ui.css">' + 
  '<script src="https://www.ncbi.nlm.nih.gov/Structure/icn3d/lib/jquery.min.js"></script>' + 
  '<script src="https://www.ncbi.nlm.nih.gov/Structure/icn3d/lib/jquery-ui.min.js"></script>' + 
  '<script src="https://www.ncbi.nlm.nih.gov/Structure/icn3d/lib/three.min.js"></script>' + 
  '<script src="https://www.ncbi.nlm.nih.gov/Structure/icn3d/full_ui_all.min.js"></script>'
);
cfg = {
  divid: "gb-ideo-sel0",
  height: "100%",
  mmdbid: "2wnu",
  resize: true,
  rotate: "right",
  width: "100%"
};
var icn3dui = new iCn3DUI(cfg);
icn3dui.show3DStructure();
