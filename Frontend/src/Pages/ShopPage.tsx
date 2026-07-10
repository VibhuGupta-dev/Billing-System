import { useState, useRef, useEffect } from "react";
import { Store, Upload, Home, ChevronRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setData } from "../Redux/Feature/NotificationSlice.js";

// ── Types ────────────────────────────────────────────────────────────────────

interface ShopForm {
  ShopName: string;
  Industry: string;
  NumberOfWorkers: string;
  ElectricityPerUnitRate: string;
  ShopIsOnRent: boolean;
  ShopRent: string;
  ShopPhoto: File | null;
}

interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
}

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

interface SuccessScreenProps {
  name: string;
  onReset: () => void;
  onDashboard: () => void;
}

// ── Constants ────────────────────────────────────────────────────────────────

const INDUSTRIES: string[] = [
  "Electronics & Appliances",
  "Grocery & FMCG",
  "Clothing & Apparel",
  "Pharmacy & Healthcare",
  "Hardware & Tools",
  "Stationery & Books",
  "Jewellery & Accessories",
  "Food & Beverages",
  "Automobile & Spares",
  "Other",
];

const EMPTY_FORM: ShopForm = {
  ShopName: "",
  Industry: "",
  NumberOfWorkers: "",
  ElectricityPerUnitRate: "",
  ShopIsOnRent: false,
  ShopRent: "",
  ShopPhoto: null,
};

// ── Page ─────────────────────────────────────────────────────────────────────

export function ShopPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ShopForm>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [shopNames, setShopNames] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const fetchShopInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/shop/ShopInfo",
          {
            withCredentials: true,
          },
        );

        const payload = response.data;
        const shopsData = Array.isArray(payload)
          ? payload
          : (payload?.shops ?? (payload ? [payload] : []));

        const names = shopsData
          .map((shop: any) => shop?.ShopName ?? shop?.shopName ?? shop?.name)
          .filter(Boolean) as string[];

        if (isMounted) {
          setShopNames(names);
        }
      } catch (error) {
        console.error("Failed to fetch shop info:", error);
      }
    };

    void fetchShopInfo();

    return () => {
      isMounted = false;
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function set<K extends keyof ShopForm>(key: K, value: ShopForm[K]): void {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handlePhoto(file: File | undefined): void {
    if (!file) return;
    setPhotoPreview(URL.createObjectURL(file));
    set("ShopPhoto", file);
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:3000/shop/addshop",
        form,
        {
          withCredentials: true,
        },
      );

      if (response.status === 201) {
        dispatch(setData("Shop registered successfully"));
        timeoutRef.current = window.setTimeout(
          () => dispatch(setData("")),
          2000,
        );
      }

      console.log(response);
      setSubmitted(true);
    } catch (error: any) {
      const msg = error?.response?.data?.message ?? "Something went wrong";
      dispatch(setData(msg));
      timeoutRef.current = window.setTimeout(() => dispatch(setData("")), 2000);
      console.error(error);
    }
  }

  if (submitted) {
    return (
      <SuccessScreen
        name={form.ShopName}
        onReset={() => {
          setSubmitted(false);
          setForm(EMPTY_FORM);
          setPhotoPreview(null);
        }}
        onDashboard={() => navigate("/")}
      />
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono   { font-family: 'JetBrains Mono', monospace; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes blink {
          0%,50%   { opacity:1; }
          51%,100% { opacity:0.25; }
        }
        @keyframes successPop {
          0%  { opacity:0; transform:scale(0.85); }
          70% { transform:scale(1.04); }
          100%{ opacity:1; transform:scale(1); }
        }
        @keyframes rentSlide {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up       { animation: fadeUp 0.55s ease-out both; }
        .animate-blink { animation: blink 1.8s ease-in-out infinite; }
        .animate-pop   { animation: successPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        .rent-slide    { animation: rentSlide 0.25s ease-out both; }
        @media (prefers-reduced-motion:reduce) {
          .fade-up,.animate-blink,.animate-pop,.rent-slide { animation:none!important; opacity:1!important; transform:none!important; }
        }
      `}</style>

      {/* Page shell */}
      <section className="font-display relative min-h-screen overflow-x-hidden bg-black text-white">
        {/* dot-grid texture */}
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* vignette */}
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 50%,transparent 0%,rgba(0,0,0,0.75) 75%)",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Breadcrumb */}
          <nav
            className="fade-up font-mono col-span-full flex items-center gap-2 text-xs text-neutral-600"
            style={{ animationDelay: "0.05s" }}
          >
            <Home size={11} />
            <button
              onClick={() => navigate("/")}
              className="text-neutral-500 transition-colors hover:text-white"
            >
              Dashboard
            </button>
            <ChevronRight size={11} />
            <span className="text-neutral-300">Add Shop</span>
          </nav>

          {/* ══════════ LEFT ══════════ */}
          <div
            className="fade-up flex flex-col gap-8  max-h-120 overflow-y-scroll  "
            style={{ animationDelay: "0.1s" }}
          >
            {/* eyebrow */}
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-neutral-300">
              <span className="animate-blink h-1.5 w-1.5 rounded-full bg-white" />
              <Store size={14} />
              Shop Setup
            </span>

            {/* heading */}
            <div >
              <h1 className="text-5xl font-bold leading-[1.1] md:text-6xl">
                Register Your
                <br />
                <span className="text-red-500">Shop</span> Today
              </h1>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-neutral-500">
                Add your business details once — unlock invoicing, inventory
                tracking, and expense reports from a single dashboard.
              </p>
            </div>

            {/* Live shop name preview */}

            {shopNames.length > 0 ? (
              shopNames.map((name, index) => (
                <div className="">

                <div className="flex items-center gap-4 ">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                    <Store size={20} className="text-neutral-400" />
                  </div>
                  <div className="min-w-0 flex-1 ">
                    <div className="space-y-1 ">
                      <div className=" ">
                        <p className=" font-mono mb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-600">
                          Your Shops
                        </p>
                        <p
                          key={`${name}-${index}`}
                          className="truncate text-2xl font-semibold text-white"
                        >
                          {name}
                        </p>
                        <ChevronRight
                          size={18}
                          className="ml-auto flex-shrink-0 text-neutral-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                </div>
              ))
            ) : (
              <p className="text-sm text-neutral-700">No shops added yet</p>
            )}
          </div>
          {/* ══════════ RIGHT — Form ══════════ */}
          <div className="fade-up" style={{ animationDelay: "0.2s" }}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8"
            >
              <div>
                <p className="text-lg font-bold">Shop Details</p>
                <p className="font-mono mt-1 text-xs text-neutral-600">
                  // fill in your business info
                </p>
              </div>

              {/* Photo upload */}
              <div className="flex flex-col gap-2">
                <Label>Shop Photo</Label>
                <div
                  className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition ${
                    dragOver
                      ? "border-white/50 bg-white/[0.07]"
                      : "border-white/15 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]"
                  }`}
                  onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                    e.preventDefault();
                    setDragOver(false);
                    handlePhoto(e.dataTransfer.files[0]);
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handlePhoto(e.target.files?.[0])
                    }
                  />
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Shop preview"
                      className="h-24 w-full rounded-lg object-cover"
                    />
                  ) : (
                    <>
                      <Upload size={22} className="text-neutral-600" />
                      <p className="text-sm font-medium text-neutral-400">
                        Drop your shop photo here
                      </p>
                      <p className="text-xs text-neutral-600">
                        PNG, JPG up to 5 MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Shop Name */}
              <Field label="Shop Name" required>
                <Input
                  type="text"
                  placeholder="e.g. Mehta Electronics"
                  value={form.ShopName}
                  onChange={(e) => set("ShopName", e.target.value)}
                  required
                />
              </Field>

              {/* Industry */}
              <Field label="Industry" required>
                <select
                  className="w-full appearance-none rounded-xl border border-white/[0.12] bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition focus:border-white/35 focus:bg-white/[0.08]"
                  style={{ fontFamily: "'Space Grotesk',sans-serif" }}
                  value={form.Industry}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    set("Industry", e.target.value)
                  }
                  required
                >
                  <option value="" disabled style={{ background: "#111" }}>
                    Select your industry
                  </option>
                  {INDUSTRIES.map((industry) => (
                    <option
                      key={industry}
                      value={industry}
                      style={{ background: "#111" }}
                    >
                      {industry}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Workers + Electricity rate */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Workers" required>
                  <Input
                    type="number"
                    min="0"
                    placeholder="e.g. 5"
                    value={form.NumberOfWorkers}
                    onChange={(e) => set("NumberOfWorkers", e.target.value)}
                    required
                  />
                </Field>
                <Field label="₹ / Unit" required>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g. 6.50"
                    value={form.ElectricityPerUnitRate}
                    onChange={(e) =>
                      set("ElectricityPerUnitRate", e.target.value)
                    }
                    required
                  />
                </Field>
              </div>

              <hr className="border-white/[0.07]" />

              {/* Rent toggle */}
              <button
                type="button"
                onClick={() => set("ShopIsOnRent", !form.ShopIsOnRent)}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-left transition hover:bg-white/[0.07]"
              >
                <div>
                  <p className="text-sm font-medium text-neutral-200">
                    Shop on Rent
                  </p>
                  <p className="font-mono mt-0.5 text-[11px] text-neutral-600">
                    Track monthly rent as an expense
                  </p>
                </div>
                {/* toggle pill */}
                <div
                  className={`relative flex-shrink-0 rounded-full transition-colors duration-200 ${
                    form.ShopIsOnRent ? "bg-white" : "bg-white/20"
                  }`}
                  style={{ height: "22px", width: "40px" }}
                >
                  <span
                    className="absolute top-[3px] left-[3px] h-4 w-4 rounded-full bg-black transition-transform duration-200"
                    style={{
                      transform: form.ShopIsOnRent
                        ? "translateX(18px)"
                        : "translateX(0)",
                    }}
                  />
                </div>
              </button>

              {/* Monthly rent — conditional */}
              {form.ShopIsOnRent && (
                <div className="rent-slide">
                  <Field label="Monthly Rent (₹)" required>
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g. 22000"
                      value={form.ShopRent}
                      onChange={(e) => set("ShopRent", e.target.value)}
                      required
                    />
                  </Field>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 text-sm font-bold text-black transition hover:bg-neutral-200 active:scale-[0.98]"
              >
                <Store size={15} />
                Register Shop
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Shared primitives ─────────────────────────────────────────────────────────

function Label({ children, required }: LabelProps) {
  return (
    <label className="font-mono mb-1.5 block text-[11px] uppercase tracking-[0.1em] text-neutral-500">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

function Field({ label, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-0">
      <Label required={required}>{label}</Label>
      {children}
    </div>
  );
}

function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-xl border border-white/[0.12] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-neutral-700 outline-none transition focus:border-white/35 focus:bg-white/[0.08] ${className}`}
      style={{ fontFamily: "'Space Grotesk',sans-serif" }}
      {...props}
    />
  );
}

// ── Success screen ────────────────────────────────────────────────────────────

function SuccessScreen({ name, onReset, onDashboard }: SuccessScreenProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .font-display { font-family:'Space Grotesk',sans-serif; }
        .font-mono { font-family:'JetBrains Mono',monospace; }
        @keyframes successPop {
          0%{opacity:0;transform:scale(0.85);}70%{transform:scale(1.04);}100%{opacity:1;transform:scale(1);}
        }
        .animate-pop { animation:successPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>
      <section className="font-display relative flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%,transparent 0%,rgba(0,0,0,0.8) 75%)",
          }}
        />
        <div className="animate-pop relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-12 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black">
            <Check size={28} strokeWidth={3} />
          </div>
          <p className="text-2xl font-bold">{name}</p>
          <p className="font-mono mt-2 text-xs text-neutral-600">
            // shop registered successfully
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={onDashboard}
              className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-neutral-200"
            >
              Go to Dashboard
            </button>
            <button
              onClick={onReset}
              className="rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-neutral-400 transition hover:border-white/35 hover:text-white"
            >
              Add Another Shop
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ShopPage;
