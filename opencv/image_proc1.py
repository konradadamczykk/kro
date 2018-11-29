import numpy as np
import cv2
import matplotlib.pyplot as plt
import argparse
from pathlib import Path
import os

def process_image(filename, save, new_file):
	cv2.namedWindow(filename, cv2.WINDOW_NORMAL)
	cv2.resizeWindow(filename, 1024, 768)

	img = cv2.imread(filename, cv2.IMREAD_GRAYSCALE)
	cv2.imshow(filename, img)
	ret, thresh = cv2.threshold(img,0,255,cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)
	
	kernel = np.ones((3,3),np.uint8)
	opening = cv2.morphologyEx(thresh,cv2.MORPH_OPEN,kernel, iterations = 2)

	sure_bg = cv2.dilate(opening,kernel,iterations=3)

	dist_transform = cv2.distanceTransform(opening,cv2.DIST_L2,5)
	ret, sure_fg = cv2.threshold(dist_transform,0.7*dist_transform.max(),255,0)

	sure_fg = np.uint8(sure_fg)
	unknown = cv2.subtract(sure_bg,sure_fg)

	cv2.imshow(filename + 'sure_fg', sure_fg)

	ret, markers = cv2.connectedComponents(sure_fg)
	print("Monet jest " + str(ret-1))

	cv2.waitKey(10000)
	# Zapisz plik docelowy na dysku
	if save:
		dir = os.getcwd() + '/outputs'
		file_to_save = dir + new_file + '.jpg'
		cv2.imwrite(file_to_save, sure_fg)

	cv2.destroyAllWindows()

	return 0

def entry():
	parser = argparse.ArgumentParser(description='Perform operations on image')
	parser.add_argument('filename', type=str, help='Filename (required)')
	parser.add_argument('to_save', type=int, help='Set if you want to save modified image', default=0)
	parser.add_argument('new_filename', type=str, help='Filename of output')

	args = parser.parse_args()

	file = Path(args.filename)

	if not file.is_file():
		print("File " + file + " does not exist")
		return -1

	process_image(args.filename, args.to_save, args.new_filename)

	return 0


if __name__ == '__main__':
	entry()