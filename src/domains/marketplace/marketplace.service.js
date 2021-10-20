// import { fetchJson } from "lib/fetch-json"

const BASE_URL = "https://ecomm-service.herokuapp.com"

export const getListings = (page, signal) =>
  fetch(`${BASE_URL}/marketplace?page=${page}`, {
    signal,
  }).then((res) => res.json())

export const getListingDetails = (listingId, signal) =>
  fetch(`${BASE_URL}/marketplace/${listingId}`, {
    signal,
  }).then((res) => res.json())
