import { useNavigate } from "react-router-dom";
import * as Popover from "@radix-ui/react-popover";
import { ShoppingCart, Sparkle, UserCircle2 } from "lucide-react";
import { useContext, useMemo } from "react";
import { CartOrderContext } from "@/App";


// Custom Lucide logo component
const LucideLogo = ({ onClick }: { onClick?: () => void }) => (
    <span
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#394551] shadow cursor-pointer hover:scale-105 transition-transform"
        onClick={onClick}
        title="Go to Home"
    >
        <Sparkle className="w-7 h-7 text-white" />
    </span>
);

export default function Header() {
    const navigate = useNavigate();
    const cartOrderCtx = useContext(CartOrderContext);
    const cartItems = cartOrderCtx?.cartItems ?? {};

    const username = "SILVIA";
    const cartSummary = useMemo(() => {
        const items = Object.values(cartItems);
        const totalPrice = items.reduce((sum, item: any) => sum + item.price * item.quantity, 0);
        return {
            count: items.length,
            totalItems: items.reduce((sum, item: any) => sum + item.quantity, 0),
            totalPrice,
        };
    }, [cartItems]);
    return (
        <>
            <header className="w-full bg-[#ffffff] shadow-sm border-b border-gray-200 fixed top-0 left-0 z-40">
                <nav className="w-full px-10 flex items-center justify-between py-1 border-b border-gray-200">

                    <div className="flex items-center gap-3">
                        <LucideLogo onClick={() => navigate("/")} />
                        <span className="font-bold text-xl text-[#394551] tracking-wide select-none">
                            InterviewHub
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="relative flex items-center cursor-pointer" style={{ minWidth: 40, minHeight: 40 }}>
                            <ShoppingCart className="w-7 h-7 text-blue-600" />
                            {cartSummary.totalItems > 0 && (
                                <span
                                    className="absolute flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full shadow"
                                    style={{
                                        top: "-6px",
                                        right: "-6px",
                                        minWidth: "20px",
                                        height: "20px",
                                        padding: "0 6px",
                                        lineHeight: "20px",
                                        zIndex: 1,
                                    }}
                                >
                                    {cartSummary.totalItems}
                                </span>
                            )}
                        </div>
                        <Popover.Root>
                            <Popover.Trigger asChild>
                                <button className="flex items-center gap-2 px-2 py-1 rounded-full border border-[#e5e7eb] bg-[#f3f4f6] hover:bg-[#394551] transition-all group">
                                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                                        <UserCircle2 className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex flex-col items-start ml-2">
                                        <span className="font-semibold text-[#394551] text-sm group-hover:text-blue-700 transition-colors">
                                            {username}
                                        </span>
                                    </div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="#394551"
                                        className="w-4 h-4 ml-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                            </Popover.Trigger>
                            <Popover.Content
                                sideOffset={8}
                                className="bg-white rounded-xl shadow-lg p-4 min-w-[220px] flex flex-col items-center gap-3 border border-slate-200 animate-fade-in"
                                style={{ zIndex: 3000 }}
                            >
                                <div className="font-semibold text-gray-900 text-base mb-1">
                                    <span style={{ color: "#394551" }}>{username}!</span>
                                </div>
                            </Popover.Content>
                        </Popover.Root>
                    </div>
                </nav>
            </header>

        </>
    );
}
