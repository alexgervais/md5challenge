# MD5 Challenge

Various solutions to cracking an MD5 hash of 5 characters, composed of lower-case letters and numbers.

## Table of content

* [Installation](#installation)
* [Usage](#usage)
 * [Algorithms](#algorithms)
* [License](#license)

## Installation

```bash
sudo npm install -g alexgervais/md5challenge
```

## Usage

```bash
md5challenge MD5_HASH [ALGORITHM]
```

### Algorithms

`rainbow` Using rainbow table lookup API.
`brute` Brute forcing the hash with all available CPUs.
`brute-1` Brute forcing the hash with all available CPUs - 1.
`brute-2` Brute forcing the hash with all available CPUs - 2.
`brute-1cpu` Brute forcing the hash with a single CPU.
`brute-random` Brute forcing the hash with all available CPUs and a randomly-sorted set of initial characters.

## License

MIT
