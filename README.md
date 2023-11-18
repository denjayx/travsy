
```mermaid
graph TD
  A[main] --> B[stage]
  B --> C[be]
  B --> D[fe]
  C --> E[be-dev]
  D --> F[fe-dev]
  E --> G[be-dev-feature1]
  E --> H[be-dev-feature2]
  F --> I[fe-dev-feature1]
  F --> J[fe-dev-feature2]  
