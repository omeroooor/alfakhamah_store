from odoo.addons.website_sale.controllers.main import WebsiteSale

from odoo.http import request
from odoo import SUPERUSER_ID
from odoo import http

class WebsiteSale(WebsiteSale):

    @http.route(['/shop/get_tabbed_products_slider_content'], type='http', auth='public', website=True)
    def get_tabbed_products_slider_content(self, **post):
        pricelist_context = dict(request.env.context)
        pricelist = False
        if not pricelist_context.get('pricelist'):
            pricelist = request.website.get_current_pricelist()
            pricelist_context['pricelist'] = pricelist.id
        else:
            pricelist = request.env['product.pricelist'].browse(pricelist_context['pricelist'])
        request.context = dict(request.context, pricelist=pricelist.id, partner=request.env.user.partner_id)
        from_currency = request.env.user.company_id.currency_id
        to_currency = pricelist.currency_id
        compute_currency = lambda price: from_currency.compute(price, to_currency)                
        value = {'obj': False,'compute_currency': compute_currency}
        if post.get('label'):
            value['header'] = post.get('label')
        if post.get('collection_id'):
            collection_data=request.env['collection.configure'].browse(int(post.get('collection_id')))
            value.update({'obj':collection_data})
            return request.render("alfakhamah_store.tabbed_products_configure", value)

        return ""