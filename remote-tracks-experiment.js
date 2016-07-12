// Experimental support for remote third-party tracks in NCBI genome browser
//
// To demo:
// 1. Go to http://www.ncbi.nlm.nih.gov/genome/gdv/?context=genome&acc=GCF_000001405.33&q=C1QA
// 2. Open your web browser's Developer Tools (e.g. Cmd-Alt-I)
// 3. Go to DevTools "Console" tab
// 4. Paste the following into DevTools console:
//    jQuery.getScript("http://104.196.135.118/remote-tracks-experiment.js");
// 5. Press "Enter"
// 6. See how the PDB structure track(s) have been added to bottom of Sequence Viewer track list

pdbId = "2WNU_A"

// We serialize BED files into JavaScript strings to enable
// experimental support for client-side requests of track
// data from different origin servers.  This enables CORS.
bedJsUrl = "http://104.196.135.118/" + pdbId + ".bed.js";

beds = {};
jQuery.getScript(bedJsUrl, function(bedData) {

  // Use the NCBI User Uploaded Data (UUD) JS API to upload raw track data
  var f = new UUD.FileUploader({
    assm_acc: "GCF_000001405.33",
    data: beds[pdbId], 
    track_name: "Residues for PDB ID " + pdbId + ", PDB2Genome, NCBI Orlando hackathon"
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