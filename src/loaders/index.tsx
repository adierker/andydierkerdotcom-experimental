// By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL
interface LoaderProps {
    className?: string
}

export const Loader = ({className}: LoaderProps) => (
  <svg width="44" height="44" viewBox="0 0 44 44" className={`h-5 w-5 ${className}`} xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
      <g fill="none" fillRule="evenodd" strokeWidth="2">
          <circle cx="22" cy="22" r="1">
              <animate attributeName="r"
                  begin="0s" dur="1.8s"
                  values="1; 20"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.165, 0.84, 0.44, 1"
                  repeatCount="indefinite" />
              <animate attributeName="stroke-opacity"
                  begin="0s" dur="1.8s"
                  values="1; 0"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.3, 0.61, 0.355, 1"
                  repeatCount="indefinite" />
          </circle>
          <circle cx="22" cy="22" r="1">
              <animate attributeName="r"
                  begin="-0.9s" dur="1.8s"
                  values="1; 20"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.165, 0.84, 0.44, 1"
                  repeatCount="indefinite" />
              <animate attributeName="stroke-opacity"
                  begin="-0.9s" dur="1.8s"
                  values="1; 0"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.3, 0.61, 0.355, 1"
                  repeatCount="indefinite" />
          </circle>
      </g>
  </svg>
)