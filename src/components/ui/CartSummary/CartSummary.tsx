// File: src/components/CartSummary.tsx
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog"

import { useCartContext } from '@/context/cartContext'

export default function CartSummary() {
  const { cart, getTotalItems, getTotalPrice, clearCart } = useCartContext()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')

  const handleConfirmOrder = async () => {
    // Prepare order object
    const order = {
      customer: { firstName, lastName, email, birthDate },
      items: cart,
      total: getTotalPrice(),
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID() // temporary order ID
    }

    // Optional: validate form fields
    if (!firstName || !lastName || !email || !birthDate) {
      alert('Please fill all required fields.')
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000)) // simulate network delay

      // Here you would replace with real API call later
      // await fetch('/api/orders', { method: 'POST', body: JSON.stringify(order) })

      // Clear cart after order is placed
      clearCart()

      // Show confirmation
      alert(`Order confirmed! Your order ID is ${order.id}`)

      // Optionally, reset form fields
      setFirstName('')
      setLastName('')
      setEmail('')
      setBirthDate('')

    } catch (error) {
      console.error(error)
      alert('Failed to place order. Please try again.')
    }
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Place Order ({getTotalItems()})</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Order Summary</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            {cart.length === 0 ? (
              <p className="text-sm text-slate-500">No items in the cart.</p>
            ) : (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {cart.map(item => (
                  <li key={item.productId} className="flex justify-between">
                    <span>{item.title} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="flex-1 border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="flex-1 border rounded px-2 py-1"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
            <input
              type="date"
              placeholder="Birth Date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </form>
        </div>

        <DialogFooter>
          <Button onClick={handleConfirmOrder} disabled={cart.length === 0}>Confirm Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}