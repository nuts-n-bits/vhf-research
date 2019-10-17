# Reyzin Scrypt paper summary

## High-level results

1. CCmem measures the sum of bit-length of each input state (>=w).
1. Evaluation of scrypt can be viewed as a DAG pebbling problem.
    1. However we don't know if cumulative pebbling complexity can be translated into CCmem for data-dependent MHFs.
1. Result: CCmem is in 𝛀(n2w) w.h.p if n large compared to w.

## Helper Thm

(?) Parallelism does not help for one-shot linear pebbling.

However same cannot be said about multi-shot liner pebbling.

## Proof outline

If adversary can produce Ji+1 from Ji without querying h a lot and store only little state, then h is compressible by the state. h is generally not compressible. -><-.
