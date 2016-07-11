$ = jQuery;
beds = {};
$.getScript("http://104.196.135.118/2WNU_A.bed.js", function(bedData) {

  // Use the NCBI User Uploaded Data (UUD) JS API to upload raw track data
  var f = new UUD.FileUploader({data: beds["2WNU_A"], track_name: "Test JS 2WNU_A"});
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
