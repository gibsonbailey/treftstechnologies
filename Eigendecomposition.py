import numpy as np
from numpy.linalg import LinAlgError

x_p = [3, -1]
y_p = [2, 0]

e_val = []
e_vec = []

e_val.append(np.array([[1.0, 0],
                       [0, 1.0]]))
e_val.append(np.array([[-1.0, 0],
                       [0, 1.0]]))
e_val.append(np.array([[-1, 0],
                       [0, -1]]))
print('Eigenvalues\n', e_val)

e_vec.append(np.array([[1, 0],
                       [0, 1]]))
e_vec.append(np.array([[1, 0],
                       [0, 1]]))
e_vec.append(np.array([[1, 0],
                       [0, 1]]))
print('\n\nEigenvectors\n', e_vec)


def eigenrecomp(eigenvalues, eigenvectors):
    eigenvec_inv = np.linalg.inv(eigenvectors)
    print('\n\nInv Eigenvectors\n', eigenvec_inv)
    print('\n\nEigenvectors\n', eigenvectors)
    return np.matmul(np.matmul(eigenvectors, eigenvalues), eigenvec_inv)


CP_quantity = len(x_p)
J = []
for i in range(CP_quantity):
    J_i = eigenrecomp(e_val[i], e_vec[i])
    J.append(J_i)
    print('\n\nJ[{}] = \n'.format(i), J_i)

print('\n\n\n\nSolving...')


A = []
b = []
A_dim = CP_quantity * 6
for i in range(CP_quantity):
    x_prime = [0] * (0 * A_dim)
    x_prime.append(1)
    y_prime = [0] * (A_dim // 2)
    y_prime.append(1)
    for j in range(1, CP_quantity + 1):
        x_prime.append(np.power(x_p[i], j))
        x_prime.append(np.power(y_p[i], j))
        y_prime.append(np.power(x_p[i], j))
        y_prime.append(np.power(y_p[i], j))
        if j > 1:
            x_prime.append(np.power(x_p[i] * y_p[i], j - 1))
            y_prime.append(np.power(x_p[i] * y_p[i], j - 1))

    x_prime.extend([0] * (A_dim - len(x_prime)))
#    y_prime.extend([0] * int((i - 0.5) * A_dim))

    x_x = [0] * (0 * A_dim)
    y_x = [0] * (A_dim // 2)
    x_x.append(0)
    y_x.append(0)
    for j in range(CP_quantity):
        x_x.append((j + 1) * np.power(x_p[i], j))
        x_x.append(0)
        y_x.append((j + 1) * np.power(x_p[i], j))
        y_x.append(0)
        if j > 0:
            x_x.append(j * np.power(x_p[i], j - 1) * np.power(y_p[i], j))
            y_x.append(j * np.power(x_p[i], j - 1) * np.power(y_p[i], j))
    x_x.extend([0] * (A_dim - len(x_x)))
#    y_x.extend([0] * int((i - 0.5) * A_dim))

    x_y = [0] * (0 * A_dim)
    y_y = [0] * (A_dim // 2)
    x_y.append(0)
    y_y.append(0)
    for j in range(CP_quantity):
        x_y.append(0)
        x_y.append((j + 1) * np.power(y_p[i], j))
        y_y.append(0)
        y_y.append((j + 1) * np.power(y_p[i], j))
        if j > 0:
            x_y.append(j * np.power(y_p[i], j - 1) * np.power(x_p[i], j))
            y_y.append(j * np.power(y_p[i], j - 1) * np.power(x_p[i], j))
    x_y.extend([0] * (A_dim - len(x_y)))
#    y_y.extend([0] * int((i - 0.5) * A_dim))

    A.append(x_prime)
    A.append(y_prime)
    A.append(x_x)
    A.append(y_x)
    A.append(x_y)
    A.append(y_y)

    b.extend([0, 0, J[i][0][0], J[i][0][1], J[i][1][0], J[i][1][1]])

A = np.array(A)
b = np.array(b)
print('\nA = \n', A)
print('\nb = \n', b)
x = None
lstsq = False
try:
    x = np.linalg.solve(A, b)
except LinAlgError:
    x = np.linalg.lstsq(A, b, rcond=None)[0]
    lstsq = True
print('\nx = \n', x)

if lstsq:
    print('\nSolved with Least Squares.\n')

x_prime_str = "x' = {}"
y_prime_str = "y' = {}"

for i in range(CP_quantity):
    additional = ''
    if i == 0:
        additional = ' + {}x + {}y'
    elif i == 1:
        additional = ' + {{}}x^{} + {{}}y^{} + {{}}xy'.format(*[i + 1] * 3)
    else:
        additional = ' + {{}}x^{} + {{}}y^{} + {{}}(xy)^{}'.format(*[i+1] * 3)
    x_prime_str += additional
    y_prime_str += additional


print('\n\n' + x_prime_str.format(*np.round(x[0:A_dim // 2], 2)))
print('\n' + y_prime_str.format(*np.round(x[A_dim // 2:A_dim], 2)))





