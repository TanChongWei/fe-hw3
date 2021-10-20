import React from 'react'
import { useAuthState } from '../domains/auth'
import { ListingItem, useListings } from '../domains/marketplace'
export function Marketplace() {
  const { data: listings } = useListings()
  const auth = useAuthState()

  const onAddToCart = (listingId, token) => {
    fetch('https://ecomm-service.herokuapp.com/marketplace/cart/items', {
      method: 'POST',
      body: JSON.stringify({
        quantity: 1,
        listingId,
      }),
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error(res.statusText)
    })
  }

  return (
    <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
                    Marketplace
        </h1>
      </div>
      <div className="bg-gray-50 lg:flex">
        <div className="flex-1">
          {listings && (
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
              {listings.map((listing) => (
                <ListingItem
                  title={listing.title}
                  description={listing.description}
                  price={listing.price}
                  availableStock={listing.numOfStock}
                  imageUrl={listing.imageUrl}
                  onlyOne={
                    listing.availability === 'single-listing'
                  }
                  onAddToCart={
                    auth.status === 'authenticated'
                      ? () =>
                        onAddToCart(
                          listing._id,
                          auth.accessToken
                        )
                      : undefined
                  }
                  listingId={listing._id}
                  key={listing._id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
