from django.core.management.base import BaseCommand
from store.models import Product

PRODUCTS = [
    {"name": "Oversized Graphic Tee - Ape Skull", "price": 799, "old_price": 1299, "category": "T-SHIRT",
     "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
     "description": "Oversized fit black tee with front graphic print."},
    {"name": "Pedestrian 404 Tee", "price": 899, "old_price": 1499, "category": "T-SHIRT",
     "image_url": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600",
     "description": "Streetwear oversized tee, drop shoulder fit."},
    {"name": "Acid Wash Tee - White", "price": 999, "old_price": 1599, "category": "T-SHIRT",
     "image_url": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600",
     "description": "Acid wash finish, 240 GSM heavy cotton."},
    {"name": "Boxy Fit Tee - Sand", "price": 749, "old_price": 1199, "category": "T-SHIRT",
     "image_url": "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600",
     "description": "Boxy silhouette, ribbed collar."},
    {"name": "Ape Logo Tee - Black", "price": 849, "old_price": 1399, "category": "T-SHIRT",
     "image_url": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600",
     "description": "Classic logo tee in 100% cotton."},
    {"name": "Vintage Wash Tee - Grey", "price": 899, "old_price": 1349, "category": "T-SHIRT",
     "image_url": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600",
     "description": "Garment dyed vintage wash tee."},
    {"name": "Street Graphic Tee - Olive", "price": 999, "old_price": 1499, "category": "T-SHIRT",
     "image_url": "https://images.unsplash.com/photo-1622445275576-721325763afe?w=600",
     "description": "Bold back print, relaxed fit."},
    {"name": "Minimal Tee - Off White", "price": 699, "old_price": 999, "category": "T-SHIRT",
     "image_url": "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=600",
     "description": "Everyday essential minimal tee."},
    {"name": "Corduroy Overshirt - Brown", "price": 1799, "old_price": 2499, "category": "SHIRT",
     "image_url": "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600",
     "description": "Heavyweight corduroy overshirt with chest pockets."},
    {"name": "Flannel Check Shirt", "price": 1499, "old_price": 2199, "category": "SHIRT",
     "image_url": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
     "description": "Brushed flannel checked shirt, regular fit."},
    {"name": "Denim Shirt - Indigo", "price": 1699, "old_price": 2399, "category": "SHIRT",
     "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600",
     "description": "Classic denim shirt with button-down collar."},
    {"name": "Linen Shirt - White", "price": 1399, "old_price": 1999, "category": "SHIRT",
     "image_url": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600",
     "description": "Breathable linen blend, full sleeve shirt."},
    {"name": "Utility Shirt - Olive Green", "price": 1599, "old_price": 2299, "category": "SHIRT",
     "image_url": "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=600",
     "description": "Multi-pocket utility shirt jacket."},
    {"name": "Oxford Shirt - Sky Blue", "price": 1299, "old_price": 1899, "category": "SHIRT",
     "image_url": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600",
     "description": "Classic oxford weave, tailored fit."},
    {"name": "Chunky Sneakers - White", "price": 2999, "old_price": 3999, "category": "FOOTWEAR",
     "image_url": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600",
     "description": "Chunky sole sneakers, lace-up closure."},
    {"name": "High-Top Sneakers - Black", "price": 3299, "old_price": 4299, "category": "FOOTWEAR",
     "image_url": "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600",
     "description": "High-top canvas sneakers with rubber sole."},
    {"name": "Running Shoes - Grey", "price": 2799, "old_price": 3599, "category": "FOOTWEAR",
     "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
     "description": "Lightweight mesh running shoes."},
    {"name": "Canvas Slip-Ons", "price": 1999, "old_price": 2699, "category": "FOOTWEAR",
     "image_url": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600",
     "description": "Casual slip-on canvas shoes."},
    {"name": "Combat Boots - Black", "price": 3599, "old_price": 4799, "category": "FOOTWEAR",
     "image_url": "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600",
     "description": "Rugged combat boots with side zip."},
    {"name": "Retro Runner Sneakers", "price": 2599, "old_price": 3399, "category": "FOOTWEAR",
     "image_url": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600",
     "description": "Retro-inspired running silhouette."},
]


class Command(BaseCommand):
    help = "Seed the database with 20 sample products"
     
    def handle(self, *args, **kwargs):
        Product.objects.all().delete()
        for p in PRODUCTS:
            Product.objects.create(**p)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(PRODUCTS)} products successfully."))