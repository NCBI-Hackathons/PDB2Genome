$ = jQuery;
beds = {};
$.getScript("http://104.196.135.118/2WNU_A.bed.js", function(bedData) {
  console.log('ok');
  var f = new UUD.FileUploader({data: beds["2WNU_A"], track_name: "Test JS 2WNU_A"});
  f.upload();
  f.getPromise().done(function(tl) {
    // id: GI of top-level sequence, here chr1 (NC_000001.11)
    var url = 'id=568815597&tracks=[id:' + tl.GetTracks()[0].GetTMSId() + ']';
    console.log("url: " + url);
	SeqView.App.getApps()[0].reload(url);
  });
});
