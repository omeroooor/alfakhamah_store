
from odoo import models, fields, api

class multitab_configure(models.Model):
    _inherit = 'multitab.configure'

    name= fields.Char(translate=True)
    product_ids=fields.Many2many(domain="[]")

class collection_configure(models.Model):

	_inherit = 'collection.configure'

	name=fields.Char(translate=True)

