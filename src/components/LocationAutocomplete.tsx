// This component will be used later for Google Maps integration
// 'use client'
// 
// import { useEffect, useRef, useState } from 'react'
// import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api'
// 
// const libraries: ("places")[] = ["places"]
// 
// interface LocationAutocompleteProps {
//   value: string
//   onChange: (location: string) => void
//   placeholder?: string
// }
// 
// export default function LocationAutocomplete({ value, onChange, placeholder }: LocationAutocompleteProps) {
//   const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null)
//   const inputRef = useRef<HTMLInputElement>(null)
// 
//   const handlePlacesChanged = () => {
//     if (searchBox) {
//       const places = searchBox.getPlaces()
//       if (places && places.length > 0) {
//         const place = places[0]
//         const formattedAddress = place.formatted_address || ''
//         onChange(formattedAddress)
//       }
//     }
//   }
// 
//   useEffect(() => {
//     // If there's a value but no searchBox, it means it's the initial value
//     // We don't want to override user's input in this case
//     if (value && !searchBox && inputRef.current) {
//       inputRef.current.value = value
//     }
//   }, [value, searchBox])
// 
//   return (
//     <LoadScript
//       googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
//       libraries={libraries}
//     >
//       <div className="relative">
//         <StandaloneSearchBox
//           onLoad={setSearchBox}
//           onPlacesChanged={handlePlacesChanged}
//         >
//           <input
//             ref={inputRef}
//             type="text"
//             placeholder={placeholder || "Search for a location"}
//             className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6150FF] focus:border-transparent text-gray-500 focus:text-[#05054E] pr-10"
//             required
//           />
//         </StandaloneSearchBox>
//         <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <circle cx="11" cy="11" r="8"/>
//             <path d="M21 21l-4.35-4.35"/>
//           </svg>
//         </span>
//       </div>
//     </LoadScript>
//   )
// } 