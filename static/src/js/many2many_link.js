odoo.define('many2many_clickable.my_updated_many2many_widgets', function (require) {
    "use strict";

    var registry = require('web.field_registry');
    var rel_fields = require('web.relational_fields');

    var FieldMany2ManyTagLinks = rel_fields.FieldMany2ManyTags.extend({
        get_badge_id: function (el) {
            if ($(el).hasClass('badge')) return $(el).data('id');
            return $(el).closest('.badge').data('id');
        },
        events: _.extend({}, rel_fields.FieldMany2ManyTags.prototype.events, {
            'click .badge': function (e) {
                e.stopPropagation();
                var self = this;
                var record_id = this.get_badge_id(e.target);
                self.do_action({
                    type: "ir.actions.act_window",
                    res_model: self.field.relation,
                    res_id: record_id,
                    views: [[false, "form"]],
                    target: "target",
                    context: self.record.getContext(),
                })
            }
        })
    });
    registry.add('many2many_taglinks', FieldMany2ManyTagLinks);

    return {
        FieldMany2ManyTagLinks: FieldMany2ManyTagLinks
    };

});