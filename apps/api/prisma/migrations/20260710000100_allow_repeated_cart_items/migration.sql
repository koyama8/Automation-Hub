-- Allow the same product to be added more than once as separate cart rows.
DROP INDEX IF EXISTS "CartItem_cartId_productId_key";
