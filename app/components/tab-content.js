export default Ember.Component.extend({
  tabName: null,
  activeTab: null,
  classNameBindings: ['isHidden:hide', 'tabContent'],
  tabContent: 'tab-content',

  isHidden: function() {
    return this.get('tabName') !== this.get('activeTab');
  }.property('tabName', 'activeTab')
});
