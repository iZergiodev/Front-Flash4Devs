
import { useTheme } from '../store/useTheme';
import './DarkModeSwitcher.css';

export const DarkModeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <div className="flex items-center justify-center absolute top-6  right-50 z-20">
      <input
        type="checkbox"
        id="darkmode-toggle"
        className="hidden inputDark"
        checked={theme === 'dark'}
        onChange={handleToggle}
      />
      <label
        htmlFor="darkmode-toggle"
        className="darkmode-switcher relative block w-24 h-12 bg-card dark:bg-[#242424] rounded-full shadow-[inset_0_2px_6px_rgba(0,0,0,0.4),inset_0_-2px_6px_rgba(255,255,255,0.4)] cursor-pointer transition-all duration-300"
      >

        <svg
          className="sun absolute w-6 top-3 left-3 z-10 transition-colors duration-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 496"
          fill={theme === 'light' ? '#fff' : '#7e7e7e'}
        >
          <rect x="240" width="16" height="72" />
          <rect x="62.097" y="90.096" transform="matrix(0.7071 0.7071 -0.7071 0.7071 98.0963 -40.6334)" width="71.999" height="16" />
          <rect y="240" width="72" height="16" />
          <rect x="90.091" y="361.915" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -113.9157 748.643)" width="16" height="71.999" />
          <rect x="240" y="424" width="16" height="72" />
          <rect x="361.881" y="389.915" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 397.8562 960.6281)" width="71.999" height="16" />
          <rect x="424" y="240" width="72" height="16" />
          <rect x="389.911" y="62.091" transform="matrix(0.7071 0.7071 -0.7071 0.7071 185.9067 -252.6357)" width="16" height="71.999" />
          <path d="M248,88c-88.224,0-160,71.776-160,160s71.776,160,160,160s160-71.776,160-160S336.224,88,248,88z M248,392c-79.4,0-144-64.6-144-144s64.6-144,144-144s144,64.6,144,144S327.4,392,248,392z" />
        </svg>
        <svg
          className="moon absolute w-6 top-3 left-16 z-10 transition-colors duration-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 49.739 49.739"
          fill={theme === 'dark' ? '#fff' : '#7e7e7e'}
        >
          <path d="M25.068,48.889c-9.173,0-18.017-5.06-22.396-13.804C-3.373,23.008,1.164,8.467,13.003,1.979l2.061-1.129l-0.615,2.268c-1.479,5.459-0.899,11.25,1.633,16.306c2.75,5.493,7.476,9.587,13.305,11.526c5.831,1.939,12.065,1.492,17.559-1.258v0c0.25-0.125,0.492-0.258,0.734-0.391l2.061-1.13l-0.585,2.252c-1.863,6.873-6.577,12.639-12.933,15.822C32.639,48.039,28.825,48.888,25.068,48.889z M12.002,4.936c-9.413,6.428-12.756,18.837-7.54,29.253c5.678,11.34,19.522,15.945,30.864,10.268c5.154-2.582,9.136-7.012,11.181-12.357c-5.632,2.427-11.882,2.702-17.752,0.748c-6.337-2.108-11.473-6.557-14.463-12.528C11.899,15.541,11.11,10.16,12.002,4.936z" />
        </svg>
      </label>
    </div>
  );
};