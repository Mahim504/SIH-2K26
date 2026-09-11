import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HardHat,
  Radio,
  Shield,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  ShieldCheck,
  AlertTriangle,
  Check,
} from 'lucide-react';

const ROLES = [
  {
    id: 'field_user',
    label: 'Field User / Site Manager',
    description: 'Submit field progress, delays and execution updates.',
    Icon: HardHat,
  },
  {
    id: 'controller',
    label: 'Project Controller',
    description: 'Monitor baseline versus actual progress and coordinate project execution.',
    Icon: Radio,
  },
  {
    id: 'authority',
    label: 'Authority / Administrator',
    description: 'Monitor project portfolio performance, governance and system administration.',
    Icon: Shield,
  },
];

export default function LoginCard() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('controller');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!userId.trim()) {
      newErrors.userId = 'Please enter a valid email address or user ID';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userId.trim()) &&
      userId.trim().length < 3
    ) {
      newErrors.userId = 'Please enter a valid email address or user ID';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const targetRoute = login(selectedRole, userId);
      navigate(targetRoute);
    }, 400);
  };

  return (
    <div className="w-full max-w-[620px] bg-white rounded-lg border border-[#D9E0E6] p-6 sm:p-8 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#123A63] tracking-tight mb-1 font-['Inter',sans-serif]">
          WELCOME TO प्रGATI
        </h2>
        <p className="text-xs sm:text-[13px] text-[#687582]">
          Sign in to access your infrastructure workspace.
        </p>
      </div>

      {/* Role Selection */}
      <div className="mb-6">
        <div className="text-[11px] font-bold tracking-wider text-[#687582] uppercase mb-2.5">
          SELECT YOUR ROLE
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.id;
            const Icon = role.Icon;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`relative flex flex-col items-center text-center p-3.5 rounded-md transition-all cursor-pointer ${isSelected
                  ? 'bg-[#EBF3F8] border-2 border-[#064F7C]'
                  : 'bg-white border border-[#D9E0E6] hover:border-[#B0BCC7] hover:bg-[#F8FAFC]'
                  }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#064F7C] flex items-center justify-center text-white">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}

                <div className={`w-8 h-8 rounded-md flex items-center justify-center mb-2 ${isSelected ? 'text-[#064F7C]' : 'text-[#687582]'}`}>
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </div>

                <div className={`text-xs font-bold mb-1 ${isSelected ? 'text-[#123A63]' : 'text-[#25313C]'}`}>
                  {role.label}
                </div>

                <p className="text-[10.5px] text-[#687582] leading-snug line-clamp-3">
                  {role.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User ID / Email */}
        <div>
          <label htmlFor="userId" className="block text-xs font-semibold text-[#25313C] mb-1.5">
            User ID / Email
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-[#89939D] pointer-events-none">
              <User className="w-4 h-4" />
            </div>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                if (errors.userId) setErrors((prev) => ({ ...prev, userId: undefined }));
              }}
              placeholder="Enter your email or user ID"
              className={`w-full pl-9 pr-3 py-2 text-xs sm:text-[13px] text-[#25313C] bg-white border rounded-[5px] placeholder:text-[#89939D] focus:outline-none transition-all ${errors.userId
                ? 'border-[#B95050] focus:border-[#B95050]'
                : 'border-[#D9E0E6] focus:border-[#064F7C]'
                }`}
            />
          </div>
          {errors.userId && (
            <div className="flex items-center gap-1.5 text-[11px] text-[#B95050] mt-1 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.userId}</span>
            </div>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-xs font-semibold text-[#25313C] mb-1.5">
            Password
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-[#89939D] pointer-events-none">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="Enter your password"
              className={`w-full pl-9 pr-10 py-2 text-xs sm:text-[13px] text-[#25313C] bg-white border rounded-[5px] placeholder:text-[#89939D] focus:outline-none transition-all ${errors.password
                ? 'border-[#B95050] focus:border-[#B95050]'
                : 'border-[#D9E0E6] focus:border-[#064F7C]'
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 text-[#89939D] hover:text-[#25313C] p-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <div className="flex items-center gap-1.5 text-[11px] text-[#B95050] mt-1 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.password}</span>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-[#687582]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-[#D9E0E6] text-[#064F7C] focus:ring-0"
            />
            <span>Remember me</span>
          </label>
          <a
            href="#forgot-password"
            onClick={(e) => {
              e.preventDefault();
              alert('Password recovery link has been dispatched to your designated nodal officer email.');
            }}
            className="text-xs font-medium text-[#064F7C] hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        {/* Primary Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-2.5 px-4 bg-[#064F7C] hover:bg-[#075985] text-white font-semibold text-xs sm:text-sm rounded-[5px] flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-75"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Security Indicator */}
      <div className="mt-5 pt-3 border-t border-[#D9E0E6] flex items-center justify-center gap-1.5 text-xs text-[#3F7D5A] font-medium">
        <ShieldCheck className="w-4 h-4 text-[#3F7D5A]" />
        <span>Secure Infrastructure Workspace</span>
      </div>
    </div>
  );
}
