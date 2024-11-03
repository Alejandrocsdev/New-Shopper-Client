// 模組樣式 (module css)
import S from './style.module.css'
// 函式庫 (library)
import HashLoader from 'react-spinners/HashLoader'

const Loader = ({ loading, size, color, override }) => {
  return (
    <div className={S.loader}>
      <HashLoader
        loading={loading}
        size={size}
        color={color || 'var(--theme-primary-text)'}
        cssOverride={override}
      />
    </div>
  )
}

export default Loader

// BarLoader
// BeatLoader
// BounceLoader
// CircleLoader
// ClimbingBoxLoader
// ClipLoader
// ClockLoader
// DotLoader
// FadeLoader
// GridLoader
// HashLoader
// MoonLoader
// PacmanLoader
// PropagateLoader
// PuffLoader
// PulseLoader
// RingLoader
// RiseLoader
// RotateLoader
// ScaleLoader
// SkewLoader
// SquareLoader
// SyncLoader
