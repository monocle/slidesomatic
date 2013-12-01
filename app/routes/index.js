// http://localhost:8000/#/?vtype=yt&vid=bzT0ezT-Jn8&start=2700&seq=2729.6,2|2733.6,3|2736.4,4

export default Ember.Route.extend({
  model: function(params, queryParams) {
    var presentation = this.store.createRecord('presentation'),

        sequences = createSequences(this.store, queryParams.seq),

        video = this.store.createRecord(queryParams.vtype + '_video', {
          start: queryParams.start,  // needs to be before videoId
          videoId: queryParams.vid
        });

    presentation.set('video', video);
    presentation.get('sequences').pushObjects(sequences);
    return presentation;
  },

  actions: {
    updateTime: function(time) {
      console.log(time);
    }
  }
});

function createSequences(store, urlFrag) {
  var split = urlFrag.split('|');
  split.unshift('0,1');

  return split.map(function(item, i, arr) {
    var stop,
        current = item.split(',');

    if (i < arr.length - 1) {
      stop = arr[i+1].split(',')[0];
    } else {
      stop = Infinity;
    }

    return store.createRecord('sequence', {
      start: current[0],
      stop: stop,
      slide: current[1]
    });
  });
}
