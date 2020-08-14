# -*- coding: utf-8 -*-

from odoo import http, SUPERUSER_ID
from odoo.http import request
from odoo.addons.website_sale.controllers.main import WebsiteSale

class WebsiteSaleInherit(WebsiteSale):

    def _get_search_order(self, post):
        # call the original cart method
        order = super(WebsiteSaleInherit, self)._get_search_order(post)
        # check if order is set
        if post.get('order'):
            return order
        else:
            return 'website_published desc, list_price asc , id desc'

    
