import { useState } from 'react';
import { Trash2, Plus, Minus, Printer, MapPin, CheckCircle, Smartphone, Banknote, Landmark, Loader2, ArrowRight } from 'lucide-react';
import { CartItem, ScreenType } from '../types';

interface CartCheckoutProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  setScreen: (screen: ScreenType) => void;
}

export default function CartCheckout({ cart, onUpdateQuantity, onRemoveItem, onClearCart, setScreen }: CartCheckoutProps) {
  // Stateful delivery coordinates
  const [deliveryAddress, setDeliveryAddress] = useState('Home • 24th Avenue, Park Slope, Brooklyn, NY 11215');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState(deliveryAddress);

  // Payments trackers
  const [paymentMethod, setPaymentMethod] = useState<'GPAY' | 'PhonePe' | 'COD'>('GPAY');

  // simulated lifecycle state
  const [isProcessing, setIsCheckingOut] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Mathematical helpers
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const gst = subtotal * 0.05;
  const deliveryFee = subtotal > 0 ? 2.00 : 0;
  const total = subtotal + gst + deliveryFee;

  const handleSimulateOrder = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsConfirmed(true);
      onClearCart(); // empties shopping cart on successful checkout
    }, 1500);
  };

  const handlePrintReceipt = () => {
    alert(`----------------------------------\n        GROCIFY RETAIL RECEIPT\n----------------------------------\nTransaction ID: #GRO-882190\nDate: ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}\n\n${cart.map(item => `${item.product.name} (x${item.quantity}) - $${(item.product.price * item.quantity).toFixed(2)}`).join('\n')}\n\nSubtotal: $${subtotal.toFixed(2)}\nGST (5%): $${gst.toFixed(2)}\nDelivery Fee: $${deliveryFee.toFixed(2)}\n----------------------------------\nTotal Payable: $${total.toFixed(2)}\n----------------------------------\nPayment Method: ${paymentMethod}\nStatus: PAID online via Secure Checkout\n\nThank you for choosing Grocify! 🌱`);
  };

  const saveAddress = () => {
    setDeliveryAddress(tempAddress);
    setIsEditingAddress(false);
  };

  if (isConfirmed) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 text-center space-y-6 animate-fade-in">
        <div className="w-24 h-24 bg-primary-container/20 rounded-full flex items-center justify-center mx-auto mb-6 scale-100 transition-transform duration-700 animate-bounce">
          <CheckCircle className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-3xl font-extrabold font-display text-primary">Order Confirmed!</h1>
        <p className="text-base text-on-surface-variant leading-relaxed">
          Your organic farm goodies are currently being prepared. Estimated delivery to <span className="font-semibold text-on-surface">{deliveryAddress.split('•')[0]}</span> is <span className="font-bold text-on-surface">25-30 mins</span>.
        </p>

        <div className="pt-8 space-y-4">
          <button
            onClick={() => {
              setIsConfirmed(false);
              setScreen('home');
            }}
            className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:bg-primary-container hover:text-on-primary-container transition-all"
            id="track-order-btn"
          >
            Track Order Live
          </button>
          <button
            onClick={() => {
              setIsConfirmed(false);
              setScreen('shop');
            }}
            className="w-full py-3 bg-surface-container text-on-surface font-semibold rounded-2xl hover:bg-surface-container-high transition-all"
            id="back-shop-btn"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Cart Items and Printable Receipt */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold font-display text-on-surface">My Shopping Cart</h2>
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-error font-semibold flex items-center gap-1 hover:underline active:scale-95"
                id="clear-all-cart-btn"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          {/* Cart Item Grid Container */}
          <div className="space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 bg-white/40 border border-dashed border-outline-variant/30 rounded-3xl p-6">
                <p className="text-on-surface-variant mb-6 font-sans">Your shopping cart is currently empty. Visit our virtual farm store to add items!</p>
                <button
                  onClick={() => setScreen('shop')}
                  className="bg-primary text-white font-bold py-3.5 px-8 rounded-2xl shadow-md hover:shadow-lg transition-all"
                  id="browse-store-btn"
                >
                  Browse Virtual Store
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="glass-card p-4 rounded-[20px] flex gap-4 items-center shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/30 hover:border-primary/20 transition-all"
                >
                  <div className="w-20 h-20 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      src={item.product.image}
                      alt={item.product.name}
                    />
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-label-md text-on-surface truncate">{item.product.name}</h3>
                        <p className="text-on-surface-variant text-[11px] font-sans truncate">{item.product.subtext}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-on-surface-variant hover:text-error p-1 rounded-full hover:bg-error-container/20 transition-colors"
                        title="Remove product"
                        id={`remove-${item.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3 font-sans">
                      <span className="font-display font-extrabold text-primary text-sm">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      {/* Quantity Toggles */}
                      <div className="flex items-center gap-3 bg-surface-container px-3 py-1 rounded-full shadow-inner border border-outline-variant/10">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-primary hover:bg-primary-container/20 p-1 rounded-full transition-colors"
                          id={`minus-${item.id}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold font-sans text-xs text-on-surface min-w-[12px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-primary hover:bg-primary-container/20 p-1 rounded-full transition-colors"
                          id={`plus-${item.id}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Printable Receipt layout */}
          {cart.length > 0 && (
            <div className="bg-surface-container ml-0 p-6 rounded-2xl border border-dashed border-outline-variant shadow-sm relative overflow-hidden font-mono mt-8 text-xs leading-relaxed text-on-surface-variant">
              {/* Receipt Punches design details */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-background rounded-full"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-background rounded-full"></div>
              
              <div className="text-center mb-4 border-b border-outline-variant border-dashed pb-4 text-on-surface font-semibold text-sm">
                <p className="font-display font-bold text-primary">Grocify Retail</p>
                <p className="font-mono text-[10px] text-on-surface-variant font-medium mt-1">Transaction ID: #GRO-882190</p>
                <p className="font-mono text-[10px] text-on-surface-variant font-medium">Date: Jun 22, 2026 | 11:45 AM</p>
              </div>

              <div className="space-y-2 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <span className="truncate">{item.product.name} (x{item.quantity})</span>
                    <span className="font-bold flex-shrink-0">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-outline-variant pt-4 space-y-1">
                <div className="flex justify-between font-bold text-primary">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>${gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm text-on-surface pt-2 border-t border-outline-variant/10">
                  <span>Total Payable</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePrintReceipt}
                className="w-full mt-6 bg-white hover:bg-neutral-50 hover:text-primary transition-all text-on-surface border border-outline-variant flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-bold font-sans tracking-wide active:scale-95 shadow-sm"
                id="print-receipt-btn"
              >
                <Printer className="w-4 h-4 text-primary" />
                Print Receipt
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Secure Billing, Address customization & Place Order button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 rounded-3xl shadow-xl border border-outline-variant/30 bg-white/70 sticky top-24">
            <h2 className="text-xl font-bold font-display text-on-surface mb-6">Secure Billing</h2>

            {/* Delivery address setup */}
            <div className="space-y-2 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant block">
                Delivery Address
              </span>
              <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/50">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div className="flex-grow min-w-0">
                    {isEditingAddress ? (
                      <div className="space-y-3">
                        <textarea
                          value={tempAddress}
                          onChange={(e) => setTempAddress(e.target.value)}
                          className="w-full p-2 bg-white text-xs border border-outline-variant focus:ring-1 focus:ring-primary rounded-xl"
                          rows={3}
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => setIsEditingAddress(false)}
                            className="bg-neutral-100 hover:bg-neutral-200 text-on-surface text-[10px] font-bold px-3 py-1 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={saveAddress}
                            className="bg-primary hover:bg-primary-container text-white hover:text-on-primary-container text-[10px] font-bold px-3 py-1 rounded-lg"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="font-bold text-xs text-on-surface">{deliveryAddress.split('•')[0]?.trim() || 'Home'}</p>
                        <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
                          {deliveryAddress.includes('•') ? deliveryAddress.split('•')[1]?.trim() : deliveryAddress}
                        </p>
                      </>
                    )}
                  </div>
                  {!isEditingAddress && (
                    <button
                      onClick={() => {
                        setTempAddress(deliveryAddress);
                        setIsEditingAddress(true);
                      }}
                      className="text-primary hover:underline text-xs font-bold shrink-0 self-start"
                      id="change-address-btn"
                    >
                      Change
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method Selectors */}
            <h3 className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-4">
              Payment Method
            </h3>
            <div className="space-y-3 mb-6">
              {/* GPay */}
              <label 
                className={`relative flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer group ${
                  paymentMethod === 'GPAY' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-outline-variant/30 hover:bg-neutral-50 bg-white/40'
                }`}
                id="pay-gpay-label"
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'GPAY'}
                  onChange={() => setPaymentMethod('GPAY')}
                  className="hidden"
                />
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm mr-4 border border-outline-variant/20">
                  <Smartphone className="w-5 h-5 text-[#4285F4]" />
                </div>
                <div className="flex-grow">
                  <p className="font-bold text-sm text-on-surface">GPay</p>
                  <p className="text-xs text-on-surface-variant">Instant secure online wallet</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  paymentMethod === 'GPAY' ? 'border-primary bg-primary' : 'border-outline-variant bg-transparent'
                }`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </label>

              {/* PhonePe */}
              <label 
                className={`relative flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer group ${
                  paymentMethod === 'PhonePe' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-outline-variant/30 hover:bg-neutral-50 bg-white/40'
                }`}
                id="pay-phonepe-label"
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'PhonePe'}
                  onChange={() => setPaymentMethod('PhonePe')}
                  className="hidden"
                />
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm mr-4 border border-outline-variant/20">
                  <Landmark className="w-5 h-5 text-tertiary" />
                </div>
                <div className="flex-grow">
                  <p className="font-bold text-sm text-on-surface">PhonePe</p>
                  <p className="text-xs text-on-surface-variant">UPI Direct Banking Link</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  paymentMethod === 'PhonePe' ? 'border-primary bg-primary' : 'border-outline-variant bg-transparent'
                }`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </label>

              {/* Cash On Delivery */}
              <label 
                className={`relative flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer group ${
                  paymentMethod === 'COD' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-outline-variant/30 hover:bg-neutral-50 bg-white/40'
                }`}
                id="pay-cod-label"
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="hidden"
                />
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm mr-4 border border-outline-variant/20">
                  <Banknote className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-grow">
                  <p className="font-bold text-sm text-on-surface">Cash on Delivery</p>
                  <p className="text-xs text-on-surface-variant">Pay when you receive package</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  paymentMethod === 'COD' ? 'border-primary bg-primary' : 'border-outline-variant bg-transparent'
                }`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </label>
            </div>

            {/* Bottom Total Payable and Placement Trigger */}
            <div className="pt-6 border-t border-outline-variant/20">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-xs text-on-surface-variant uppercase font-semibold">Grand Total</p>
                  <p className="font-display font-extrabold text-3xl text-on-surface">
                    ${total.toFixed(2)}
                  </p>
                </div>
                <p className="text-xs text-primary font-bold bg-primary-container/20 px-3 py-1 rounded-full">
                  Earn {Math.round(total * 2)} pts
                </p>
              </div>

              <button
                onClick={handleSimulateOrder}
                disabled={cart.length === 0 || isProcessing}
                className="w-full bg-[#fea619] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-8 rounded-2xl font-bold font-display shadow-lg shadow-secondary/20 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                id="place-order-cta"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  <>
                    Place Secure Order
                    <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
