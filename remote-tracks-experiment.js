// Experimental support for remote third-party tracks in NCBI genome browser
//
// To demo:
// 1. Go to https://www.ncbi.nlm.nih.gov/genome/gdv/?context=genome&acc=GCF_000001405.33&q=KIF1A
// 2. Open your web browser's Developer Tools (e.g. Cmd-Alt-I)
// 3. Go to DevTools "Console" tab
// 4. Paste the following into DevTools console:
//    jQuery.getScript("https://ncbi-hackathons.github.io/PDB2Genome/remote-tracks-experiment.js");
// 5. Press "Enter"
// 6. See how the PDB structure track(s) have been added to bottom of Sequence Viewer track list

var stem = "chr2";

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
  });
});
