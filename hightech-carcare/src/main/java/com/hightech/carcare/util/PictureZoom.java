package com.hightech.carcare.util;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.Iterator;

import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.event.IIOWriteProgressListener;
import javax.imageio.stream.FileImageOutputStream;
import javax.swing.ImageIcon;

public class PictureZoom {

	private static final int WIDTH = 120; // 缩略图宽度
	private static final int HEIGHT = 120;// 缩略图高度

	public static BufferedImage zoom(byte[] imagesrc,boolean isThumbnail) {
		int width = WIDTH;
		int height = HEIGHT;
		// 使用源图像文件名创建ImageIcon对象。
		ImageIcon imgIcon = new ImageIcon(imagesrc);
		// 得到Image对象。
		Image img = imgIcon.getImage();
		if(!isThumbnail){
			width = img.getWidth(null);
			height = img.getHeight(null);
		}
		return zoom(img,width,height);
	}

	public static BufferedImage zoom(Image srcImage,int width,int height) {
		
		// 构造一个预定义的图像类型的BufferedImage对象。
		BufferedImage buffImg = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB);
		// buffImg.flush();
		// 创建Graphics2D对象，用于在BufferedImage对象上绘图。
		Graphics2D g = buffImg.createGraphics();

		// 设置图形上下文的当前颜色为白色。
		g.setColor(Color.WHITE);
		// 用图形上下文的当前颜色填充指定的矩形区域。
		g.fillRect(0, 0, width, height);
		// 按照缩放的大小在BufferedImage对象上绘制原始图像。
		g.drawImage(srcImage, 0, 0, width, height, null);
		// 释放图形上下文使用的系统资源。
		g.dispose();
		// 刷新此 Image 对象正在使用的所有可重构的资源.
		srcImage.flush();

		return buffImg;
	}

	@SuppressWarnings("rawtypes")
	public static boolean writeImageFile(File file, BufferedImage image, int quality,
			IIOWriteProgressListener progressListener) {
		try {
			String suffix = getFileSuffix(file);

			if (suffix == null) {
				return false;
			}

			Iterator it = ImageIO.getImageWritersBySuffix(suffix);
			if (it.hasNext()) {
				FileImageOutputStream fileImageOutputStream = new FileImageOutputStream(file);
				ImageWriter iw = (ImageWriter) it.next();
				ImageWriteParam iwp = iw.getDefaultWriteParam();
				iwp.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
				//iwp.setCompressionQuality(quality / 100.0f);
				iw.setOutput(fileImageOutputStream);
				iw.addIIOWriteProgressListener(progressListener);
				iw.write(null, new javax.imageio.IIOImage(image, null, null),iwp);
				iw.dispose();
				fileImageOutputStream.flush();
				fileImageOutputStream.close();
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
		return true;
	}

	public static String getFileSuffix(File file) {
		if (file == null) {
			return null;
		}
		return getFileSuffix(file.getName());
	}

	/** */
	/**
	 * 取得文件后缀。 如果文件名输入为 null 返回 null； 如果没有取得后缀则返回 ""。
	 * 
	 * @param fileName
	 * @return
	 */
	public static String getFileSuffix(String fileName) {
		if (fileName == null) {
			return null;
		}

		String suffix = "";
		int i = fileName.lastIndexOf('.');
		if (i > 0 && i < fileName.length() - 1) {
			suffix = fileName.substring(i + 1);
		}
		return suffix;
	}
}