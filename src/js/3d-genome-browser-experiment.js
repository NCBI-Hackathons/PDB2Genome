// Experimental support for:
//   - embedding iCn3D in Genome Data Viewer
//   - loading remote, third party tracks in Genome Data Viewer
//
// To demo:
// 1. Go to https://www.ncbi.nlm.nih.gov/genome/gdv/?context=genome&acc=GCF_000001405.33&q=KIF1A
// 2. Open your web browser's Developer Tools (e.g. Cmd-Alt-I)
// 3. Go to DevTools "Console" tab
// 4. Paste the following into DevTools console:
//    jQuery.getScript("https://ncbi-hackathons.github.io/PDB2Genome/3d-genome-browser-experiment.js");
// 5. Press "Enter"
// 6. See how the PDB structure track(s) have been added to bottom of Sequence Viewer track list//
//
//
// Author: Eric Weitz (https://github.com/eweitz)

$ = jQuery;
$("head").append(
  '<link rel="stylesheet" href="https://www.ncbi.nlm.nih.gov/Structure/icn3d/lib/jquery-ui.min.css">' + 
  '<link rel="stylesheet" href="https://www.ncbi.nlm.nih.gov/Structure/icn3d/icn3d_full_ui.css">' + 
  '<script src="https://www.ncbi.nlm.nih.gov/Structure/icn3d/lib/jquery.min.js"></script>' + 
  '<script src="https://www.ncbi.nlm.nih.gov/Structure/icn3d/lib/jquery-ui.min.js"></script>' + 
  '<script src="https://www.ncbi.nlm.nih.gov/Structure/icn3d/lib/three.min.js"></script>'
);

function initializeICn3D() {

	var dialog = 
	    '<div id="icn3d_dialog" title="iCn3D embed">' + 
			'<p>Loading 3D molecule...</p>' + 
	    '</div>';
	$("body").append(dialog);
	$("#icn3d_dialog").dialog({
		height: 600,
		width: 700
	});	

	cfg = {
	  divid: "icn3d_dialog",
	  height: "100%",
	  width: "100%",
	  mmdbid: "2wnu",
	  resize: true,
	  rotate: "right"
	};
	var icn3dui = new iCn3DUI(cfg);
	icn3dui.show3DStructure();
}

function check3dDependencies() {
  timeout = setTimeout(function() {
	if (typeof THREE === "undefined") {
	  check3dDependencies();
	} else {
	  $.getScript("https://www.ncbi.nlm.nih.gov/Structure/icn3d/full_ui_all.min.js", function() {
	  	initializeICn3D();
	  });
	}
	},
	50 // poll at 50 ms intervals
  );
};

stem = "chr2";

// We serialize BED files into JavaScript strings to enable
// experimental support for client-side requests of track
// data from different origin servers.  This enables CORS.
bedJsUrl = "https://ncbi-hackathons.github.io/PDB2Genome/bedjs/" + stem + ".bed.js"

beds = {};
jQuery.getScript(bedJsUrl, function(bedData) {

  // Use the NCBI User Uploaded Data (UUD) JS API to upload raw track data
  var f = new UUD.FileUploader({
    assm_acc: "GCF_000001405.33",
    data: beds[stem], 
    track_name: "Remote PDB track for " + stem + ", PDB2Genome, NCBI Orlando hackathon"
  });
  f.upload();

  f.getPromise().done(function(tl) {

    var sv, viewParams, uploadedTrack;

    // Get the Sequence Viewer (SV) instance
    sv = SeqView.App.getApps()[0];

    uploadedTrack = tl.GetTracks()[0];

    sv.addUploadedTrackID(uploadedTrack);

    viewParams = sv.m_AllViewParams;

    sv.reload(viewParams);
	
	check3dDependencies();
  });
});
